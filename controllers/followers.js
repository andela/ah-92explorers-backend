import models from '../models';

const { users, Follow } = models;
/**
 * @param {class} --Followers controller
 */
class follower {
  /**
   * Users can follow each other
   * @param {object} req
   * @param {object} res
   * @returns {object} res message
   */
  static async follow(req, res) {
    try {
      const { username } = req.params;
      const checkUser = await users.findOne({ where: { username } });
      const loggedinUser = await users.findOne({ where: { username: req.decoded.username } });
      if (!checkUser) {
        return res.status(404).json({ error: 'User does not exists!' });
      }
      if (checkUser.id === loggedinUser.id) {
        return res.status(400).json({ error: 'You can not follow yourself' });
      }
      const following = await Follow.findOne({
        where: { userId: loggedinUser.id, followed: checkUser.id }
      });
      if (!following) {
        await Follow.create({
          followed: checkUser.id,
          userId: loggedinUser.id
        });
        return res.status(201).json({
          message: `you are following ${checkUser.username}`
        });
      }
      await Follow.destroy({ where: { userId: loggedinUser.id, followed: checkUser.id } });
      return res.status(200).json({
        message: `you unfollowed ${checkUser.username}`
      });
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong, please try again!' });
    }
  }

  static async followed(req, res) {
    try {
      const { username } = req.params;
      const checkUser = await users.findOne({ where: { username } });
      const loggedinUser = await users.findOne({ where: { username: req.decoded.username } });
      if (!checkUser) {
        return res.status(404).json({ error: 'User does not exists!' });
      }
      if (checkUser.id === loggedinUser.id) {
        return res.status(400).json({ error: 'You can not follow yourself' });
      }
      const following = await Follow.findOne({
        where: { userId: loggedinUser.id, followed: checkUser.id }
      });
      if (following) {
        return res.status(200).json({
          message: 'following'
        });
      }
      if (!following) {
        return res.status(200).json({
          message: 'follow'
        });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong, please try again!' });
    }
  }

  /**
   * Users can get his/her followers
   * @param {object} req
   * @param {object} res
   * @returns {object} res message
   */
  static async followers(req, res) {
    try {
      const loggedinUser = await users.findOne({ where: { username: req.decoded.username } });
      const followers = await Follow.findAll({
        attributes: [],
        where: { followed: loggedinUser.id },
        include: { model: users, as: 'follower', attributes: ['username', 'image'] }
      });
      return followers.length
        ? res.status(200).json({
          message: 'Followers',
          follower: followers.map(e => e.follower),
          total: followers.length
        })
        : res.status(404).json({ error: "You don't have followers" });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch followers, please try again!' });
    }
  }

  /**
   * Users can get his followings
   * @param {object} req
   * @param {object} res
   * @returns {object} res message
   */
  static async following(req, res) {
    try {
      const loggedinUser = await users.findOne({ where: { username: req.decoded.username } });
      const following = await Follow.findAll({
        attributes: [],
        where: { userId: loggedinUser.id },
        include: [{ model: users, as: 'following', attributes: ['username', 'image'] }]
      });
      return following.length
        ? res.status(200).json({
          message: 'Following',
          following: following.map(e => e.following),
          total: following.length
        })
        : res.status(404).json({ error: "You aren't following anyone" });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch following, please try again!' });
    }
  }
}
export default follower;
