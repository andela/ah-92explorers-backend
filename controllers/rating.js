import models from '../models';

const { articles, ratings, users } = models;
class Rating {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async rateArticle(req, res) {
    try {
      const { articleSlug } = req.params;
      const { rating } = req.body;

      const article = await articles.findOne({
        where: { slug: articleSlug },
        attributes: ['id', 'title', 'slug', 'body'],
        include: [{ model: users, as: 'author' }]
      });

      if (!article) {
        return res.status(404).json({ error: 'failed to find an article to rate' });
      }

      const { title, body, author } = article;

      const user = await users.findOne({ where: { email: req.decoded.email } });

      const rate = await ratings.findOne({ where: { articleSlug, userId: user.id } });
      if (!rate) {
        await ratings.create({
          rating,
          articleSlug,
          userId: user.id
        });
      }
      if (rate) {
        await rate.update({ rating }); // update the rate if it is already there
      }
      // find all rate on an article
      const allRates = await ratings.findAll({
        where: { articleSlug },
        attributes: ['rating'],
      });

      const arrayRates = [];
      allRates.map((_e, i) => arrayRates.push(allRates[i].rating));// mapping index of rating
      if (allRates.length === 0) {
        return res.status(404).json({
          error: 'No rate on this article'
        });
      }

      // sum of all rate on article
      const totalRates = arrayRates.reduce((acc, currVal) => acc + currVal);
      return res.status(201).json({
        message: 'you have successfully rated this article',
        rating: {
          rates: Math.round(totalRates / allRates.length), // average of rate
          author: author.username,
          title,
          body
        }
      });
    } catch (error) {
      return res.status(500).json({ error: 'failed to rate article' });
    }
  }

  static async getRating(req, res) {
    try {
      let page, limit;
      if (Object.keys(req.query).length === 0) {
        page = 1; limit = 10;
      } else if (req.query.limit === undefined) {
        ({ page } = req.query); limit = 10;
      } else ({ page, limit } = req.query);
      const { articleSlug } = req.params;
      const rating = await ratings.findAll({
        where: { articleSlug },
        attributes: ['rating'],
        include: [{ model: users, attributes: ['username', 'image'] }],
        offset: ((parseInt(page, 10) - 1) * limit),
        limit
      });

      if (rating.length === 0) {
        return res.status(404).json({
          error: 'failed to find article ratings'
        });
      }
      const allRatings = await ratings.findAll({ where: { articleSlug } });
      return res.status(200).json({
        message: 'successfully fetched article ratings',
        rating,
        metadata: {
          currentPage: parseInt(page, 10),
          previousPage: parseInt(page, 10) > 1 ? parseInt(page, 10) - 1 : null,
          nextPage: Math.ceil(allRatings.length / limit) > page ? parseInt(page, 10) + 1 : null,
          totalPages: Math.ceil(allRatings.length / limit),
          limit: parseInt(limit, 10)
        }
      });
    } catch (error) {
      return res.status(500).json({
        error: 'failed to fetch article ratings'
      });
    }
  }
}

export default Rating;
