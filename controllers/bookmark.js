import models from '../models';

const { bookmark, articles, users } = models;
/**
  * @description Controller for Bookmarking
*/
class Bookmark {
  /**
    * @param {object} req
    * @param {object} res
    * @param {string} string
    * @returns {object} response
  */
  static async bookmark(req, res) {
    try {
      const { slug } = req.params;
      const articleId = await articles.findOne({
        where: { slug }
      });
      if (!articleId) {
        return res.status(404).json({
          error: 'Article is not found.'
        });
      }
      const loggedinUser = await users.findOne({ where: { username: req.decoded.username } });
      const userId = loggedinUser.id;
      const bookmarked = await bookmark.findOne({
        where: {
          userId,
          articleId: articleId.dataValues.id
        },
      });
      const { title } = articleId;
      if (!bookmarked) {
        await bookmark.create({
          userId,
          articleId: articleId.dataValues.id
        });
        return res.status(201).json({
          message: 'Successfully bookmarked the article',
          article: {
            title
          }
        });
      }
      await bookmark.destroy({ where: { userId, articleId: articleId.dataValues.id } });
      return res.status(204).json({
        message: 'Successfully unbookmarked the article',
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to bookmark article, please try again' });
    }
  }

  /**
    * @param {object} req
    * @param {object} res
    * @param {string} string
    * @returns {object} response
  */
  static async unBookmark(req, res) {
    try {
      const { slug } = req.params;
      const articleId = await articles.findOne({
        where: { slug }
      });
      if (!articleId) {
        return res.status(404).json({
          error: 'Article is not found.'
        });
      }
      const loggedinUser = await users.findOne({ where: { username: req.decoded.username } });
      const userId = loggedinUser.id;
      const bookmarked = await bookmark.findOne({
        where: {
          userId,
          articleId: articleId.dataValues.id,
        },
      });
      if (bookmarked) {
        await bookmark.destroy({
          where: {
            userId,
            articleId: articleId.dataValues.id
          }
        });
      }
      return res.status(204).json({
        message: 'Successfully unbookmarked the article'
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to unbookmark article, please try again' });
    }
  }

  /**
    * @param {object} req
    * @param {object} res
    * @returns {object} response
  */
  static async getBookmarks(req, res) {
    try {
      const loggedinUser = await users.findOne({ where: { username: req.decoded.username } });
      const userId = loggedinUser.id;
      const Bookmarks = await bookmark.findAll({
        attributes: [],
        where: {
          userId,
        },

        include: [{ model: articles, as: 'article', attributes: ['title', 'description', 'body', 'tagList', 'image', 'createdAt', 'updatedAt'] }],
      });
      return res.status(200).json({
        message: 'Article bookmarks retrieved!',
        Bookmarks,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve bookmarks, please try again' });
    }
  }
}

export default Bookmark;
