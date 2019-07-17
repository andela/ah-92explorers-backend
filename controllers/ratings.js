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

      const findArticle = await articles.findOne({
        where: { slug: articleSlug },
        attributes: ['id', 'title', 'slug', 'body'],
        include: [{ model: users, as: 'author' }]
      });

      if (findArticle === null) {
        return res.status(404).json({ error: 'failed to find an article to rate' });
      }

      const {
        title, body, slug, author
      } = findArticle;


      const user = await users.findOne({ where: { email: req.decoded.email } });

      const findRate = await ratings.findOne({
        where: { articleSlug: slug, userId: user.id }, attributes: ['rating']
      });

      switch (true) {
        case findRate === null:
          await ratings.create({
            rating,
            articleSlug: slug,
            userId: user.id
          });
          return res.status(201).json({
            message: 'you have successfully rated this article',
            rating: {
              rating,
              author: author.username,
              title,
              body
            }
          });

        case findRate !== null:
          return res.status(200).json({
            message: 'you already rated this article',
            rating
          });
      }
    } catch (error) {
      return res.status(500).json({ error: 'failed to rate article' });
    }
  }

  static async getRating(req, res) {
    try {
      const { articleSlug } = req.params;
      const rating = await ratings.findAll({
        where: { articleSlug },
        attributes: ['rating'],
      });

      if (rating.length === 0) {
        return res.status(404).json({
          error: 'failed to find article ratings'
        });
      }

      return res.status(200).json({
        message: 'successfully fetched article ratings',
        rating
      });
    } catch (error) {
      return res.status(500).json({
        error: 'failed to fetch article ratings'
      });
    }
  }
}

export default Rating;
