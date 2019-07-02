import models from '../models';

export default class User {
  static async userFacebookGoogle(req, res) {
    // console.log('in controller =====', req.user);
    try {
      const facebookGoogleUser = await models.User.findOrCreate({
        where: { email: req.user.emails[0].value },
        defaults: {
          firstName: req.user.name.givenName,
          lastName: req.user.name.familyName,
          username: req.user.username,
          provider: req.user.provider
        }
      });
      if (facebookGoogleUser) {
        return res.status(201).json({
          message: 'user successful registered',
          user: {
            // token,
            firstName: req.user.name.givenName,
            lastName: req.user.name.familyName,
            email: req.user.emails[0].value,
            provider: req.user.provider
          }
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Server Error'
      });
    }
  }

  static async userTwitter(req, res) {
    try {
      const userInfo = {};

      if (req.user.displayName) {
        const [firstName, lastName] = req.user.displayName.split(' ');
        userInfo.firstName = firstName;
        userInfo.lastName = lastName;
      }

      const twitterUser = await models.User.findOrCreate({
        where: { username: req.user.username, provider: req.user.provider },
        defaults: {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          provider: req.user.provider,
          email: 'null'
        }
      });
      if (twitterUser) {
        return res.status(201).json({
          status: 201,
          user: {
            // token,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            provider: req.user.provider
          }
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Server Error'
      });
    }
  }

  static socialSignOut(req, res) {
    req.logout();
    // res.redirect('/welcome');
    res.status(200).json({ message: 'You are successful logged Out' });
  }
}
