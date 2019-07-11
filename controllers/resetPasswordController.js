import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models';
import sendEmail from '../helpers/sendEmail';
import Auth from '../helpers/auth';

dotenv.config();

const { users } = models;

const secretKey = process.env.SECRET;
const expirationTime = {
  expiresIn: '1day',
};

class ResetPasswordController {
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
        const token = jwt.sign(payload, secretKey, expirationTime);
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

  static async getToken(req, res) {
    return res.send({ token: req.params.token });
  }

  static async resetPassword(req, res) {
    const password = Auth.hashPassword(req.body.password);
    const { token } = req.body;
    const decoded = await jwt.decode(token, secretKey);
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
