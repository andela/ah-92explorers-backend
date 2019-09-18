import dotenv from 'dotenv';
import he from 'he';
import open from 'open';
import models from '../models';
import { accReadTime } from '../helpers/readTime';
import { notificationForFollower, sendNotificationToFollower } from './notifications';

const {
  articles, users, ratings, likes, comments, bookmark
} = models;

dotenv.config();

/**
 * @param {class} --Article
 */
class Article {
  /**
   *
   * @param {Object} req
   * @param {Object} res  get all created articles
   * @returns {Object} return all created articles
   */
  static async retrieveArticles(req, res) {
    try {
      // @pagination
      let page, limit;
      if (Object.keys(req.query).length === 0) {
        page = 1;
        limit = 10;
      } else if (req.query.limit === undefined) {
        ({ page } = req.query);
        limit = 10;
      } else ({ page, limit } = req.query);
      // @retrieve articles
      const allArticles = await articles.findAll({
        order: [['createdAt', 'DESC']],
        attributes: [
          'id',
          'title',
          'slug',
          'description',
          'body',
          'tagList',
          'image',
          'createdAt',
          'authorId'
        ],
        include: [
          {
            as: 'author',
            model: users,
            attributes: ['username', 'image']
          },
          {
            as: 'comments',
            model: comments,
            attributes: ['id', 'body', 'createdAt', 'updatedAt'],
            include: [
              {
                as: 'commentor',
                model: users,
                attributes: ['username', 'image']
              }
            ]
          },
          {
            as: 'ratings',
            model: ratings,
            attributes: ['rating', 'createdAt', 'updatedAt'],
            include: [
              {
                as: 'reviewer',
                model: users,
                attributes: ['username', 'image']
              }
            ]
          },
          {
            as: 'likes',
            model: likes,
            attributes: ['typeState', 'createdAt', 'updatedAt'],
            include: [
              {
                as: 'liker',
                model: users,
                attributes: ['username', 'image']
              }
            ]
          },
          {
            as: 'bookmarks',
            model: bookmark,
            attributes: ['id', 'userId', 'articleId', 'createdAt', 'updatedAt'],
          },
        ],
        offset: (parseInt(page, 10) - 1) * limit,
        limit
      });
      allArticles.forEach((item) => {
        item.body = he.decode(item.body);
      });
      const totalArticles = await articles.findAll();
      return res.status(200).json({
        articles: allArticles,
        metadata: {
          currentPage: parseInt(page, 10),
          previousPage: parseInt(page, 10) > 1 ? parseInt(page, 10) - 1 : null,
          nextPage: Math.ceil(totalArticles.length / limit) > page ? parseInt(page, 10) + 1 : null,
          totalPages: Math.ceil(totalArticles.length / limit),
          limit: parseInt(limit, 10)
        }
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve articles, please try again' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} this will return created article
   */
  static async createArticle(req, res) {
    try {
      const findUser = await users.findOne({ where: { email: req.decoded.email } });
      const {
        title, body, description, tagList
      } = req.body;
      // @save articles
      const article = await articles.create({
        title,
        description,
        body: he.encode(body),
        tagList: tagList ? tagList.split(',') : null,
        authorId: findUser.id,
        image: req.file ? req.file.url : null
      });
      const { slug, image } = article;
      const user = await users.findOne({ where: { id: article.authorId } });
      const { username, bio } = user;
      const payload = {
        slug,
        title,
        description,
        body: he.decode(article.body),
        tagList,
        image,
        author: { username, bio, image: user.image }
      };
      const message = `${username} published new article <a href="${process.env.FRONT_END_URL}/api/articles/${article.slug}">${article.title}</a>`;
      await notificationForFollower(article.authorId, message);
      await sendNotificationToFollower(article.authorId, message);
      return res.status(201).json({ message: 'Article created successfully', article: payload });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create article, please try again' });
    }
  }

  /**
   * Get a single article
   * @param {Object} req - Request from user
   * @param {Object} res - view single article
   * @returns {Object} return article
   */
  static async getSingleArticle(req, res) {
    const { slug } = req.params;
    try {
      // @find an article which the slug
      const article = await articles.findOne({
        where: {
          slug
        },
        include: [
          {
            model: users,
            as: 'author',
            attributes: ['username', 'email', 'id']
          },
          {
            as: 'comments',
            model: comments,
            attributes: ['id', 'body', 'createdAt', 'updatedAt'],
            include: [
              {
                as: 'commentor',
                model: users,
                attributes: ['username', 'image']
              }
            ]
          },
          {
            as: 'ratings',
            model: ratings,
            attributes: ['rating', 'createdAt', 'updatedAt'],
            include: [
              {
                as: 'reviewer',
                model: users,
                attributes: ['username', 'image']
              }
            ]
          },
          {
            as: 'likes',
            model: likes,
            attributes: ['typeState', 'createdAt', 'updatedAt'],
            include: [
              {
                as: 'liker',
                model: users,
                attributes: ['username', 'image']
              }
            ]
          },
          {
            as: 'bookmarks',
            model: bookmark,
            attributes: ['id', 'userId', 'articleId', 'createdAt', 'updatedAt'],
          },
        ]
      });
      if (article) {
        const rating = await ratings.findAll({
          where: {
            articleSlug: article.slug
          }
        });
        const {
          title, description, tagList, image, author,
        } = article;
        const payload = {
          id: article.id,
          time: accReadTime(article.body),
          slug,
          title,
          description,
          body: he.decode(article.body),
          tagList,
          image,
          author,
          comments: article.comments,
          likes: article.likes,
          ratings: rating,
          bookmarks: article.bookmarks
        };
        return res.status(200).json({ article: payload });
      }
      return res.status(404).json({ error: 'Sorry the requested article could not be found.' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to show the article, please try again' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res  updated article
   * @returns {Object} return updated article
   */
  static async updateArticle(req, res) {
    const {
      title, description, body, tagList
    } = req.body;
    try {
      // @update article
      const updatedArticle = await articles.update(
        {
          title,
          description,
          body: he.encode(body),
          tagList: tagList ? tagList.split(',') : req.findArticle.tagList,
          image: req.file ? req.file.url : req.findArticle.image
        },
        {
          where: {
            slug: req.params.slug
          },
          individualHooks: true
        }
      );
      const {
        slug, authorId, image, createdAt, updatedAt
      } = updatedArticle[1][0];
      const message = `
      ${req.decoded.username} 
      updated article <a href="${process.env.FRONT_END_URL}/api/articles/${updatedArticle[1][0].slug}">${updatedArticle[1][0].title}</a>`;
      await notificationForFollower(updatedArticle[1][0].authorId, message);
      await sendNotificationToFollower(updatedArticle[1][0].authorId, message);
      const payload = {
        slug,
        title,
        description,
        body: he.decode(updatedArticle[1][0].body),
        authorId,
        image,
        createdAt,
        updatedAt
      };
      return res.status(200).json({
        message: 'Article updated successfully',
        article: payload
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update the article, please try again' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res  delete article
   * @returns {Object} return message
   */
  static async deleteArticle(req, res) {
    try {
      // @delete article
      await articles.destroy({
        where: {
          slug: req.params.slug
        }
      });
      return res.status(204).send('');
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete article, please try again' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {object} response
   */
  static async shareArticle(req, res) {
    const { slug, channel } = req.params;
    const articleSlug = await articles.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: users,
          as: 'author',
          attributes: ['username', 'email', 'id']
        },
      ]
    });
    if (!articleSlug) {
      return res.status(404).json({
        status: 404,
        message: 'Article is not found.'
      });
    }
    const url = `${process.env.FRONT_END_URL}/article/${slug}`;
    const {
      title, description, tagList, image, author,
    } = articleSlug;
    const payload = {
      slug,
      title,
      description,
      body: he.decode(articleSlug.body),
      tagList,
      image,
      author,
    };
    const tweet = `"${payload.title}" by ${payload.author.username}. ${'\n'} @ ${url}`;
    switch (channel) {
      case 'facebook':
        if (process.env.NODE_ENV !== 'test') {
          open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        }
        res.status(200).json({
          status: 200,
          message: `Article shared to ${channel}`
        });
        break;
      case 'twitter':
        if (process.env.NODE_ENV !== 'test') {
          open(`https://twitter.com/intent/tweet?text=${tweet}&hashtags=92-explorers`);
        }
        res.status(200).json({
          status: 200,
          message: `Article shared to ${channel}`
        });
        break;
      case 'mail':
        if (process.env.NODE_ENV !== 'test') {
          open(`mailto:?subject=${payload.title}&body=Checkout this article "${payload.title}" by ${payload.author.username} on Authors Haven. ${'\n\n'} @ ${url}`);
        }
        res.status(200).json({
          status: 200,
          message: `Article shared to ${channel}`
        });
        break;
      default:
        break;
    }
  }
}

export default Article;
