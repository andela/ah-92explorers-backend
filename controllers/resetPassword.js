import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models';
import sendEmail from '../helpers/sendEmail';
import Auth from '../helpers/auth';

dotenv.config();

const { users } = models;

const { SECRET, FRONT_END_URL } = process.env;
const expirationTime = {
  expiresIn: '1day'
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
      email: req.body.email
    };
    try {
      const checkUser = await users.findOne({
        where: {
          email: user.email
        }
      });
      if (checkUser) {
        const payload = {
          email: checkUser.email
        };
        const token = jwt.sign(payload, SECRET, expirationTime);
        req.body.token = token;
        req.body.template = 'resetPassword';
        sendEmail(user.email, token, 'resetPassword');
        return res
          .status(200)
          .send({ message: 'We have sent a password reset link to your email' });
      }
      return res.status(404).json({ error: 'The email provided does not exist' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to reset password' });
    }
  }

  /**
   * get the reset password token.
   * @param {object} req request.
   * @param {object} res response.
   * @returns {object} response.
   */
  static getToken(req, res) {
    return res.redirect(`${FRONT_END_URL}/resetting-password?${req.params.token}`);
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
    try {
      const decoded = await jwt.decode(token, SECRET);
      if (decoded) {
        const checkUpdate = await users.update(
          {
            password
          },
          {
            where: {
              email: decoded.email
            }
          }
        );
        if (checkUpdate.length >= 1) {
          return res.status(200).json({ message: 'You have successfully reset your password' });
        }
      }
      return res.status(403).json({ error: 'Permission to access this resource has been denied' });
    } catch (error) {
      return res.status(500).send({ error: 'Failed to reset password' });
    }
  }
}

export default ResetPasswordController;
