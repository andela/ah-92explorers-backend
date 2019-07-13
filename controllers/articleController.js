import dotenv from 'dotenv';
import models from '../models';

const { articles, users } = models;

dotenv.config();

/**
 * @param {class} --Article controller
 */
class ArticleController {
  /**
   *
   * @param {Object} req
   * @param {Object} res  get all created articles
   * @returns {Object} return all created articles
   */
  static async index(req, res) {
    try {
      // @retrieve articles
      const allArticles = await articles.findAndCountAll({
        order: [['article_id', 'DESC']],
        include: [
          {
            model: users,
            as: 'authorfkey',
            attributes: ['username', 'email', 'id']
          }
        ]
      });
      return res.status(200).json({ articles: allArticles });
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} this will return created article
   */
  static async create(req, res) {
    const {
      title, description, body,
    } = req.body;
    const clientUrl = (process.env.NODE_ENV === 'production') ? 'https://ah-92explorers-api.herokuapp.com' : 'http://127.0.0.1:3000';
    const findUser = await users.findOne({ where: { email: req.user.email } });
    try {
      // @save articles
      const article = await articles.create({
        title,
        description,
        body,
        taglist: (req.body.tag ? req.body.tag.split(',') : null),
        author: findUser.id,
        image: (req.file ? req.file.url : null)
      });
      const user = await users.findOne({
        where: {
          id: article.author
        }
      });
      const payload = {
        title: article.title,
        slug: article.slug,
        description: article.description,
        body: article.body,
        taglist: article.taglist,
        author: user.username,
        image: article.image,
        url: `${clientUrl}/api/articles/${article.slug}`,
      };
      res.status(201).json({ message: 'Article created successfully', article: payload });
    } catch (error) {
      res.status(500).json({ error: `something wrong please try again. ${error}` });
    }
  }

  /**
   * Get a single article
   * @param {Object} req - Request from user
   * @param {Object} res - view single article
   * @returns {Object} return article
   */
  static async show(req, res) {
    const {
      slug
    } = req.params;

    try {
      // @find an article which the slug
      const article = await articles.findOne({
        where: {
          slug,
        },
        include: [
          {
            model: users,
            as: 'authorfkey',
            attributes: ['username', 'email', 'id']
          }
        ]
      });
      if (!article) {
        return res.status(404).json({ message: 'Sorry the requested article could not be found.' });
      }
      res.status(200).json({ article });
    } catch (error) {
      return res.status(500).json(`error: ${error}`);
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res  updated article
   * @returns {Object} return updated article
   */
  static async update(req, res) {
    const {
      title, description, body,
    } = req.body;
    try {
      // @update article
      const updatedArticle = await articles.update({
        title,
        description,
        body,
        taglist: (req.body.tag ? req.body.tag.split(',') : req.findArticle.taglist)
      }, {
        where: {
          slug: req.params.slug
        },
        individualHooks: true
      });
      res.status(200).json({
        message: 'article updated successfully.',
        article: updatedArticle
      });
    } catch (error) {
      return res.status(500).json({ error: `Something wrong please try again later.${error}` });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res  delete article
   * @returns {Object} return message
   */
  static async delete(req, res) {
    try {
      // @delete article
      await articles.destroy({
        where: {
          slug: req.params.slug
        }
      });
      return res.status(200).json({ message: 'Article deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ error: `Something wrong please try again later. ${error}` });
    }
  }
}

export default ArticleController;
