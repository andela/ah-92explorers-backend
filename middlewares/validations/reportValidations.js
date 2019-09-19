/**
 * Report validations' middleware
 * @exports
 * @class
 */
class reportValidations {
  /**
   * Validate create report
   * @param {object} req - Request made by the user
   * @param {object} res - Object that capture response
   * @param {callback} next - allow other functionalities to run
   * @returns {object} response
   */
  static async validateCreateReport(req, res, next) {
    const { message, type } = req.body;

    switch (true) {
      case message === null
        || message === undefined
        || type === null
        || type === undefined:
        return res.status(400).json({
          error: 'A valid message, title and type are required'
        });

      case message.length > 150 || typeof message === 'number':
        return res.status(400).json({
          error: [
            'message should not have more than 150 characters',
            'message should not be numeric',
          ]
        });
    }

    next();
  }
}

export default reportValidations;
