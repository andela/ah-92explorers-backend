import models from '../models';

const {
  comments, commentLikes, users, articles
} = models;

/**
* Class to control likes for comments
*/
export default class CommentLikes {
  static async likeComment(req, res) {
    try {
      const comment = await comments.findOne({
        where: { id: req.params.commentId }, attributes: ['id', 'body', 'articleId']
      });

      const author = await users.findOne({
        where: { email: req.decoded.email }, attributes: ['id', 'firstName', 'lastName']
      });

      const article = await articles.findOne({
        where: { id: comment.articleId }, attributes: ['id', 'slug']
      });

      const like = await commentLikes.findOne({
        where: { userId: author.id, commentId: comment.id, likes: 1 }
      });

      if (!like) {
        await commentLikes.create({
          userId: author.id,
          commentId: comment.id,
          articleSlug: article.slug,
          likes: 1,
        });
        return res.status(201).json({
          message: 'you liked this comment',
        });
      }
      await like.destroy({ userId: author.id, likes: 1 });
      return res.status(200).json({
        message: 'you unliked this comment',
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to like this comment, please try again' });
    }
  }
}
