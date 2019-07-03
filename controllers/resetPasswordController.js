import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models/index';
import sendEmail from '../helpers/sendEmail';
import Auth from '../helpers/auth';


dotenv.config();
const User = models.users;
const secretKey = process.env.SECRET_KEY_CODE;
const expirationTime = {
  expiresIn: '1day',
};

class ResetPasswordController {
  static sendResetLinkEmail(req, res) {
    const user = {
      email: req.body.email,
    };
    return User.findOne({
      where: {
        email: user.email,
      }
    })
      .then(async (foundUser) => {
        if (foundUser) {
          const payload = {
            email: foundUser.email,
          };
          const token = jwt.sign(payload, secretKey, expirationTime);
          req.body.token = token;
          req.body.template = 'resetPassword';
          await sendEmail(user.email, token, 'resetPassword');
          res.status(200).send({ message: 'We have e-mailed a password reset link, Check your email!' });
        } else {
          res.status(404).json({ error: 'The email provided does not exist' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }


  static async resetPassword(req, res) {
    const password = Auth.hashPassword(req.body.password);
    const { token } = req.body;
    const decoded = await jwt.decode(token, secretKey);
    try {
      if (decoded) {
        const checkUpdate = await User.update(
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
