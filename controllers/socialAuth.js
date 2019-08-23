import dotenv from 'dotenv';
import crypto from 'crypto';
import models from '../models';
import Auth from '../helpers/auth';

dotenv.config();
const { FRONT_END_URL } = process.env;
const { users } = models;
const algorithm = 'aes-256-ctr';
const { CRYPTO_PASSWORD } = process.env;
export default class User {
  static enc(data) {
    const cipher = crypto.createCipher(algorithm, CRYPTO_PASSWORD);
    let crypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  static returnValue(req, res) {
    const { name, provider, emails, } = req.user;
    const email = emails[0].value;
    const { givenName, familyName } = name;
    const username = familyName + givenName + provider;
    const user = {
      message: 'user successful registered',
      user: { firstName: givenName, lastName: familyName, email },
      token: Auth.genToken(username, email)
    };
    const data = User.enc(user);
    return res.redirect(`${FRONT_END_URL}/continue?token=${data}`);
  }

  static async userFacebookGoogle(req, res) {
    const { name, emails, provider } = req.user;
    const { givenName, familyName } = name;
    const email = emails[0].value;
    const firstName = givenName; const lastName = familyName;
    const password = process.env.SOCIAL_LOGIN_PASSWORD;
    const username = familyName + givenName + provider;
    try {
      const facebookUserGoogle = await users.findOrCreate({
        where: { email },
        defaults: {
          firstName, lastName, username, email, provider, password: Auth.hashPassword(password)
        }
      });
      if (facebookUserGoogle) {
        User.returnValue(req, res);
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Server Error'
      });
    }
  }

  static async userTwitter(req, res) {
    const [firstName, lastName] = req.user.displayName.split(' ');
    const { username, provider } = req.user;
    const email = process.env.TWITTER_EMAIL;
    const password = process.env.SOCIAL_LOGIN_PASSWORD;
    try {
      const twitterUser = await users.findOrCreate({
        where: { username, provider },
        defaults: {
          firstName, lastName, username, email, provider: 'twitter', password: Auth.hashPassword(password)
        }
      });
      if (twitterUser) {
        const user = {
          message: 'user successful registered',
          user: { firstName, lastName, username },
          token: Auth.genToken(username, email)
        };
        const data = User.enc(user);
        return res.redirect(`${FRONT_END_URL}/continue?token=${data}`);
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Server Error'
      });
    }
  }
}
