import models from '../models';

const { users, reports, articles } = models;

class Reports {
  /**
   * Authenticated user should be able to report
   * an article that violate terms of aggrement.
   *
   * @param {*} req request object.
   * @param {*} res response object.
   * @returns {*}   response to be returned.
   */
  static async reportArticle(req, res) {
    try {
      const { slug } = req.params;
      const { message, type } = req.body;

      const user = await users.findOne({ where: { email: req.decoded.email } });

      const article = await articles.findOne({
        where: { slug },
        attributes: ['id', 'slug', 'title', 'body']
      });
      if (!article) {
        return res.status(404).json({
          error: 'The article you\'re trying to report is not found',
        });
      }

      const report = await reports.findOne({
        where: { reporter: user.id, articleId: article.id },
        attributes: ['id']
      });

      if (report) {
        return res.status(200).json({
          message: 'You have already reported this article',
        });
      }

      const createReport = await reports.create({
        articleId: article.id,
        reporter: user.id,
        message,
        type
      });
      if (!createReport) {
        return res.status(500).json({
          error: 'Failed to handle this request',
        });
      }

      if (createReport) {
        return res.status(201).json({
          message: 'successfully reported article',
          report: {
            message,
            type,
            article,
          }
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Server failed to handle your request',
      });
    }
  }

  /**
   * Only Admin should be able to get all articles
   * that have been reported.
   *
   * @param {*} req request object.
   * @param {*} res response object.
   * @returns {*}   response to be returned.
   */

  static async checkUser(req, res) {
    const checkUser = await users.findOne({ where: { email: req.decoded.email } });
    if (checkUser.accessLevel === 0) {
      return res.status(401).json({
        error: 'Unauthorized to make this request',
      });
    }
  }

  static async getAllReportedArticle(req, res) {
    Reports.checkUser(req, res);
    try {
      const allReports = await reports.findAll({
        attributes: { exclude: ['id', 'articleId', 'reporter'], },
        include: [{
          as: 'reported by',
          model: users,
          attributes: ['username', 'image']
        }, {
          model: articles,
          attributes: ['slug']
        }]
      });
      if (allReports) {
        return res.status(200).json({
          message: 'successfully reported article',
          reports: allReports,
        });
      }
      if (allReports.length === 0) {
        return res.status(404).json({
          error: 'No reported article',
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Server failed to handle your request',
      });
    }
  }

  static async getMyReportedArticle(req, res) {
    try {
      const user = await users.findOne({ where: { email: req.decoded.email } });
      const myReports = await reports.findAll({
        where: { reporter: user.id },
        attributes: { exclude: ['id', 'articleId', 'reporter'], },
        include: [{
          model: articles,
          attributes: ['title', 'slug']
        }]
      });
      if (myReports.length === 0) {
        return res.status(404).json({
          error: 'No reported article',
        });
      }
      if (myReports) {
        return res.status(200).json({
          message: 'successfully reported article',
          reports: myReports,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Server failed to handle your request',
      });
    }
  }

  /**
   * Authenticated admin should be able to delete report
   *
   * @param {*} req request object.
   * @param {*} res response object.
   * @returns {*}   response to be returned.
   */
  static async deleteReportedArticle(req, res) {
    const { slug } = req.params;
    try {
      const article = await articles.findOne({ where: { slug } });
      if (!article) {
        return res.status(404).json({
          error: 'This article is not found',
        });
      }
      const checkUser = await users.findOne({
        where: { email: req.decoded.email, accessLevel: 0 }
      });
      if (checkUser) {
        return res.status(401).json({
          error: 'Unauthorized to make this request',
        });
      }
      if (!checkUser) {
        const destroy = await articles.destroy({ where: { slug } });
        if (!destroy) {
          return res.status(500).json({
            error: 'Failed to delete the article'
          });
        }
      }

      return res.status(200).json({
        message: 'successfully deleted a report'
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Server failed to handle your request',
      });
    }
  }
}

export default Reports;
