import dotenv from 'dotenv';
import models from '../models';
import Auth from '../helpers/auth';

dotenv.config();

const { users } = models;

export default class User {
  static returnValue(req, res) {
    const { name, provider, emails, } = req.user;
    const email = emails[0].value;
    const { givenName, familyName } = name;
    const username = familyName + givenName + provider;
    return res.status(201).json({
      message: 'user successful registered',
      user: { firstName: givenName, lastName: familyName, email },
      token: Auth.genToken(username, email)
    });
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
        return res.status(201).json({
          message: 'user successful registered',
          user: { firstName, lastName, username },
          token: Auth.genToken(username, email)
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Server Error'
      });
    }
  }
}
