import dotenv from 'dotenv';
import models from '../models';
import {
  notificationForFavorite,
  notifyFavoritees,
  notificationForFollower,
  sendNotificationToFollower,
} from './notifications';

dotenv.config();
const { articles, likes, users } = models;

class Like {
  static async likeArticle(req, res) {
    try {
      const { articleSlug } = req.params;
      const article = await articles.findOne({
        where: { slug: articleSlug },
        include: [{ as: 'likes', model: likes }]
      });

      if (!article) {
        return res.status(404).json({
          error: 'failed to find an article to like'
        });
      }
      const user = await users.findOne({
        where: { email: req.decoded.email },
        include: [{ as: 'liker', model: likes }]
      });
      const like = await likes.findOne({ where: { articleSlug: article.slug, userId: user.id }, attributes: ['typeState'] });
      const message = `${req.decoded.username} liked an article <a href="${process.env.FRONT_END_URL}/articles/${articleSlug}">${article.title}</a>`;
      switch (true) {
        case !like:
          await likes.create({
            userId: user.id,
            articleSlug: article.slug,
            typeState: 1
          });
          await notificationForFollower(article.id, message);
          await sendNotificationToFollower(article.id, message);
          await notificationForFavorite(article.id, message, article.authorId, article.slug);
          await notifyFavoritees(article.id, message, article.authorId, article.slug);
          return res.status(201).json({
            message: 'successfully liked article',
            likes: article.likes,
            username: user.username,
          });

        case like.typeState === 1:
          await likes.destroy(
            {
              where: {
                userId: user.id,
                typeState: 1
              }
            }
          );
          return res.status(200).json({
            message: 'successfully unliked article',
            likes: article.likes,
            username: user.username,
          });
        case like.typeState === 0:
          await likes.update(
            {
              typeState: 1
            },
            {
              where: { articleSlug: article.slug, userId: user.id }
            }
          );
          return res.status(201).json({
            message: 'successfully liked article',
            likes: article.likes,
            username: user.username,
          });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'failed to like or unlike article'
      });
    }
  }

  static async dislikeArticle(req, res) {
    try {
      const { articleSlug } = req.params;
      const article = await articles.findOne({
        where: { slug: articleSlug },
        include: [{ as: 'likes', model: likes }]
      });

      if (!article) {
        return res.status(404).json({
          error: 'failed to find an article to dislike'
        });
      }
      const user = await users.findOne({
        where: { email: req.decoded.email },
        include: [{ as: 'liker', model: likes }]
      });
      const like = await likes.findOne({ where: { articleSlug: article.slug, userId: user.id }, attributes: ['typeState'] });
      switch (true) {
        case !like:
          await likes.create({
            userId: user.id,
            articleSlug: article.slug,
            typeState: 0
          });
          return res.status(201).json({
            message: 'successfully disliked article',
            likes: article.likes,
            username: user.username,
          });

        case like.typeState === 0:
          await likes.destroy(
            {
              where: {
                userId: user.id,
                typeState: 0
              }
            }
          );
          return res.status(200).json({
            message: 'successfully undisliked article',
            likes: article.likes,
            username: user.username,
          });
        case like.typeState === 1:
          await likes.update(
            {
              typeState: 0
            },
            {
              where: { articleSlug: article.slug, userId: user.id }
            }
          );
          return res.status(201).json({
            message: 'successfully disliked article',
            likes: article.likes,
            username: user.username,
          });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'failed to dislike an article'
      });
    }
  }
}

export default Like;
