import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models';
import sendEmail from '../helpers/sendEmail';
import Auth from '../helpers/auth';

dotenv.config();

const { users } = models;

const { SECRET } = process.env;
const expirationTime = {
  expiresIn: '1day',
};

/**
 * @user controller
 * @exports
 * @class
 */
class ResetPasswordController {
  /**
   * Send password reset email.
   * @param {object} req request
   * @param {object} res response.
   * @returns {object} response.
   */
  static async sendResetLinkEmail(req, res) {
    const user = {
      email: req.body.email,
    };
    try {
      const checkUser = await users.findOne({
        where: {
          email: user.email,
        }
      });
      if (checkUser) {
        const payload = {
          email: checkUser.email,
        };
        const token = jwt.sign(payload, SECRET, expirationTime);
        req.body.token = token;
        req.body.template = 'resetPassword';
        sendEmail(user.email, token, 'resetPassword');
        return res.status(200).send({ message: 'We have e-mailed a password reset link, Check your email!' });
      }
      return res.status(404).json({ error: 'The email provided does not exist' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  /**
   * get the reset password token.
   * @param {object} req request.
   * @param {object} res response.
   * @returns {object} response.
   */
  static getToken(req, res) {
    return res.send({ token: req.params.token });
  }

  /**
   * Resets password.
   * @param {object} req request.
   * @param {object} res response.
   * @returns {object} response.
   */
  static async resetPassword(req, res) {
    const password = Auth.hashPassword(req.body.password);
    const { token } = req.body;
    const decoded = await jwt.decode(token, SECRET);
    try {
      if (decoded) {
        const checkUpdate = await users.update(
          {
            password,
          },
          {
            where: {
              email: decoded.email,
            }
          }
        );
        if (checkUpdate.length >= 1) {
          return res.status(200).json({ message: 'Your password was reset successfully' });
        }
      }
      return res.status(401).json({ error: 'Invalid token' });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
}

export default ResetPasswordController;
