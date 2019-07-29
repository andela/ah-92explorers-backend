import db from '../models';
import {
  sendNotificationToFollower,
  notificationForFollower,
} from './notifications';

const {
  comments, sequelize, articles, users, 
  commentEdits, highlightArticleComments
} = db;

class Comment {
  static async createComment(req, res) {
    const transaction = await sequelize.transaction();
    const { body } = req.body;
    const { slug } = req.params;
    const { username } = req.decoded;
    try {
      if (body.length <= 0) {
        return res.status(400).json({
          error: 'comment body cannot be null'
        });
      }
      const article = await articles.findOne({
        where: {
          slug,
        }
      });
      const user = await users.findOne({
        where: { username, }
      });
      if (article && user) {
        const articleId = article.id;
        const comment = await comments.create({
          body, articleId, authorId: user.id
        },
        { returning: true });
        await transaction.commit();
        if (comment) {
          const showComment = await comments.findOne({
            where: { id: comment.id },
            include: [{
              as: 'commentor',
              model: users,
              attributes: ['image', 'username'],
            }]
          });
          const {
            commentor, createdAt, updatedAt,
          } = showComment;
          const articleRef = {
            slug: article.slug
          };
          const message = `${commentor.username} commented on <a href="ah-92explorers-api.herokuapp.com/api/articles/${article.slug}">${article.title}</a>`;
          await notificationForFollower(article.authorId, message, commentor, commentor.username);
          await sendNotificationToFollower(article.authorId, message);
          return res.status(201).json({
            message: 'commented',
            comment: {
              body: showComment.body,
              author: commentor,
              article: articleRef,
              createdAt,
              updatedAt,
            },
          });
        }
      }
      return res.status(404).json({ error: 'article or user not found' });
    } catch (ex) {
      await transaction.rollback();
      res.status(500).json({
        error: 'failed to comment on article'
      });
    }
  }

  static async getArticleComments(req, res) {
    try {
      const { articleSlug } = req.params;
      const article = await articles.findOne({
        attributes: ['title', 'slug', 'description', 'body', 'tagList', 'image', 'createdAt', 'updatedAt', 'authorId'],
        where: { slug: articleSlug },
        include: [{
          attributes: ['id', 'body', 'createdAt', 'updatedAt'],
          as: 'comments',
          model: comments,
          include: [{
            as: 'commentor',
            model: users,
            attributes: ['username', 'image']
          }
          ]
        }]
      });

      if (!article) {
        return res.status(404).json({
          error: 'failed to find article and comments'
        });
      }

      return res.status(200).json({
        message: 'successfully fetched comments of this article',
        article
      });
    } catch (error) {
      return res.status(500).json({
        error: 'failed to fetch comments and history'
      });
    }
  }

  static async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      const { email } = req.decoded;
      const comment = await comments.findOne({
        where: { id: commentId },
        include: [{
          as: 'commentor',
          model: users
        }]
      });

      if (!comment) {
        return res.status(404).json({
          error: 'failed to find comment'
        });
      }

      if (email !== comment.commentor.email) {
        return res.status(403).json({
          error: 'you are not allowed to delete this comment'
        });
      }

      await comments.destroy({
        where: { id: commentId }
      });
      return res.status(204).json({
        message: 'successfully deleted comment'
      });
    } catch (error) {
      return res.status(500).json({
        error: 'failed to delete comment'
      });
    }
  }

  static async updateComment(req, res) {
    try {
      const { commentId } = req.params;
      const { email } = req.decoded;
      const { body } = req.body;
      const user = await users.findOne({
        where: { email }
      });
      const comment = await comments.findOne({
        where: { id: commentId }
      });
      if (comment.authorId !== user.id) {
        return res.status(403).json({
          error: 'user cannot update this comment'
        });
      }
      await comments.update(
        {
          body
        },
        {
          where: { id: commentId }
        }
      );
      await commentEdits.create({
        commentId: comment.id,
        body: comment.body
      });
      return res.status(200).json({
        message: 'successfully updated and tracked comment',
        comment: {
          body,
          id: comment.id
        }
      });
    } catch (error) {
      return res.status(500).json({
        error: 'failed to update and track comment'
      });
    }
  }

  static async getSingleComment(req, res) {
    try {
      const { commentId } = req.params;
      const edits = await commentEdits.findAll({
        where: { commentId }
      });
      const comment = await comments.findOne({
        where: { id: commentId }
      });

      return res.status(200).json({
        comment,
        edits
      });
    } catch (error) {
      return res.status(500).json({
        error: 'failed to get comment'
      })
    }
  }
  
  static async highlightTextAndComment(req, res) {
    try {
      const { articleSlug } = req.params;
      const {
        comment, highlight, startIndex, stopIndex
      } = req.body;
      const { email } = req.decoded;
      const article = await articles.findOne({ where: { slug: articleSlug } });
      const user = await users.findOne({ where: { email } });
      const highlightText = await highlightArticleComments.create({
        startIndex,
        stopIndex,
        highlight,
        comment,
        articleSlug: article.slug,
        authorId: user.id
      }, { returning: true });
      return res.status(201).json({
        message: 'successfully commented on text',
        highlightText
      });
    } catch (error) {
      return res.status(500).json({
        error: 'failed to comment on highlited text'
      });
    }
  }
}

export default Comment;
