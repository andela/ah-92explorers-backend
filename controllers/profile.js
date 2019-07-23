import db from '../models';

const { users } = db;

/**
* @exports Profile
* @class Profile
* @description Handles User Profile
* */
class Profile {
  /**
  * Get all user profiles by username
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @return {json} Returns json object
  * @static
  */
  static async getProfile(req, res) {
    try {
      const { username } = req.params;
      const user = await users.findOne({
        where: { username }
      });

      if (!user) {
        return res.status(404).json({
          error: 'User does not exists!',
        });
      }

      const {
        firstName, lastName, bio, image, phone, facebook, twitter, linkedIn, instagram, location
      } = user;

      return res.status(200).json({
        message: 'User profile retrieved!',
        profile: {
          firstName,
          lastName,
          bio,
          image,
          phone,
          facebook,
          twitter,
          linkedIn,
          instagram,
          location
        },
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Failed to retrieve user profile'
      });
    }
  }

  /**
  * Update user profile
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @return {json} Returns json object
  * @static
  */
  static async updateProfile(req, res) {
    try {
      const { email } = req.decoded;
      const {
        firstName, lastName, bio, phone, facebook, twitter, linkedIn, instagram, location
      } = req.body;

      const user = await users.findOne({
        where: { email }
      });

      if (!user) {
        return res.status(404).json({
          error: 'User does not exists!',
        });
      }

      await user.update({
        firstName,
        lastName,
        bio,
        image: (req.file ? req.file.url : user.image),
        phone,
        facebook,
        twitter,
        linkedIn,
        instagram,
        location
      });


      return res.status(200).json({
        message: 'User profile updated!',
        profile: {
          firstName,
          lastName,
          bio,
          image: user.image,
          phone,
          facebook,
          twitter,
          linkedIn,
          instagram,
          location,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to update user profile'
      });
    }
  }
}

export default Profile;
