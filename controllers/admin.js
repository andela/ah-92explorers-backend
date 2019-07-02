import models from '../models';
import Auth from '../helpers/auth';

const { users } = models;

class Users {
  static async createUser(req, res) {
    const {
      firstname, lastname, email, username, password
    } = req.body;
    try {
      await users.create({
        firstname,
        lastname,
        email,
        username,
        password: Auth.hashPassword(password), // Generating a hashed psaaword
      });
      return res.status(201).json({
        message: 'user successfully created',
        user: {
          email,
          username
        }
      });
    } catch (error) {
      if (error.original.code === '23505') {
        return res.status(409).json({
          error: 'This email or username is already registered'
        });
      }
      return res.status(500).json({
        error: 'failed to create user'
      });
    }
  }

  static async getUsers(req, res) {
    try {
      const allUsers = await users.findAll({
        attributes: ['id', 'username', 'email', 'createdAt', 'accessLevel']
      });
      return res.status(200).json({
        message: 'successfully returned all users in the database',
        users: allUsers
      });
    } catch (error) {
      return res.status(500).json({
        error: 'failed to fetch users'
      });
    }
  }

  static async updateUser(req, res) {
    const { userId } = req.params;
    const { accessLevel } = req.body;
    try {
      const checkUser = await users.findOne({
        where: {
          id: userId,
        }
      });
      if (accessLevel > 2 || accessLevel < 0) {
        return res.status(400).json({
          error: 'accessLevel should be lower than 2 and greater than 0'
        });
      }
      const updated = await users.update({
        accessLevel
      }, {
        where: {
          id: checkUser.id
        },
        returning: true
      });

      return res.status(200).json({
        message: 'successfully updated user accessLevel',
        user: {
          email: updated[1][0].email,
          username: updated[1][0].username,
          accessLevel: updated[1][0].accessLevel
        }
      });
    } catch (error) {
      if (error.original.code === '22P02') {
        return res.status(400).json({
          error: 'invalid accessLevel entry or userId'
        }); // The above code reps a sequelize error code for invalid datatype entry
      }
      return res.status(500).json({
        error: 'failed to update record'
      });
    }
  }

  static async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      const checkUser = await users.findOne({
        where: {
          id: userId,
        }
      });

      if (checkUser === null) {
        return res.status(404).json({
          error: 'user not found'
        });
      }

      await users.destroy({
        where: {
          id: checkUser.id
        }
      });

      return res.status(204).json({
        message: 'successfully deleted user',
      });
    } catch (error) {
      return res.status(500).json({
        error: 'failed to delete user'
      });
    }
  }
}

export default Users;
