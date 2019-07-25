import models from '../models/index';

const { articleStats, users, articles } = models;

/**
 * Reading stats controller
 * @exports
 * @class
 */
class ReadingStats {
  /**
   * Record user reading stats
   * @param {object} req - user's request
   * @param {object} res - response
   * @return {object} response
   */
  static async recordUserReading(req, res) {
    try {
      const authUser = await users.findOne({ where: { email: req.decoded.email } });
      const { articleSlug } = req.params;
      const [result, created] = await articleStats.findOrCreate({
        where: { userId: authUser.id, articleSlug }, defaults: { numberOfReading: 1 }
      });
      if (!created) {
        await articleStats.update(
          { numberOfReading: result.numberOfReading + 1 },
          { where: { id: result.id }, returning: true }
        );
      }
      const getArticle = await articles.findOne({ where: { slug: articleSlug } });
      res.status(201).json({
        message: 'You are reading the article',
        article: getArticle.title
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to record reading' });
    }
  }

  /**
   * Get user reading stats
   * @param {object} req - user's request
   * @param {object} res - response
   * @return {object} response
   */
  static async getUserReadingStats(req, res) {
    try {
      const authUser = await users.findOne({ where: { email: req.decoded.email } });
      const totalUserReadingStats = await articleStats.count({ where: { userId: authUser.id } });
      const articlesRead = await articleStats.findAll({
        order: [['createdAt', 'DESC']],
        where: { userId: authUser.id },
        attributes: [
          ['numberOfReading', 'totalArticleRead'],
          ['updatedAt', 'lastTime']],
        include: [
          {
            model: articles,
            attributes: ['title', 'slug', 'body'],
          }
        ]
      });
      if (totalUserReadingStats) {
        return res.status(200).json({ totalArticlesRead: totalUserReadingStats, articlesRead });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to get user reading stats' });
    }
  }
}

export default ReadingStats;
