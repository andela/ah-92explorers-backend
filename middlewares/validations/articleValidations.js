/**
 * Article validations' middleware
 * @exports
 * @class
 */
class articleValidations {
  /**
 * Validate create article
 * @param {object} req - Request made by the user
 * @param {object} res - Object that capture response
 * @param {callback} next - allow other functionalities to run
 * @returns {object} response
 */
  static async validateCreateArticle(req, res, next) {
    const { title, body } = req.body;
    const errors = [];
    if (title === null || title === undefined
        || body === null || body === undefined) {
      errors.push('title or body shouldn\'t be empty');
    } else if (title.length <= 5 || body.length <= 20) {
      errors.push('title length should be not less than 5 and body length shouldn\'t be less than 20');
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  }

  /**
   * Validate update article
   * @param {object} req - Request made by the user
   * @param {object} res - Object that capture response
   * @param {callback} next - allow other functionalities to run
   * @returns {object} response
   */
  static async validateUpdateArticle(req, res, next) {
    const { title, body } = req.body;
    const errors = [];
    if ((title && title === null) || (body && body === null)) {
      errors.push('title or body shouldn\'t be empty');
    } else if ((title && title.length <= 5) || (body && body.length <= 20)) {
      errors.push('title length should be not less than 5 and body length shouldn\'t be less than 20');
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  }

  static validateRating(req, res, next) {
    const { rating } = req.body;

    switch (true) {
      case typeof rating === 'string':
        return res.status(400).json({
          error: 'rating should be a number'
        });

      case rating < 0 || rating > 5:
        return res.status(400).json({
          error: 'rating should be between 1-6'
        });
    }

    next();
  }
}

export default articleValidations;
