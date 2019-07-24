/**
 * Rate an article validations' middleware
 * @exports
 * @class
 */
export default class ratingValidations {
  static validateRating(req, res, next) {
    const { rating } = req.body;

    switch (true) {
      case typeof rating === 'string':
        return res.status(400).json({
          error: 'rating should be a number'
        });

      case rating < 0 || rating > 5:
        return res.status(400).json({
          error: 'rating should be 1-5'
        });
    }

    next();
  }
}
