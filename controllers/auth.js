import db from '../models';
import Auth from '../helpers/auth';

export const signup = async (req, res) => {
  const {
    username, firstname, lastname, email, password,
  } = req.body;
  const hashedPassword = Auth.hashPassword(password);
  const transaction = await db.sequelize.transaction();
  try {
    const newUser = await db.users.create({
      username, firstname, lastname, email, password: hashedPassword,
    }, {
      transaction,
    });
    await transaction.commit();
    if (newUser) {
      return res.status(201).json({
        message: 'created successfully',
        user: {
          token: Auth.genToken(username, email),
          username: newUser.username,
          email: newUser.email,
        },
      });
    }
  } catch (ex) {
    await transaction.rollback();
    return res.status(409).json({ message: `${ex.errors[0].path.toLowerCase()} already exists` });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const transaction = await db.sequelize.transaction();
  try {
    const user = await db.users.findOne({ where: { email: req.body.email } }, { transaction });
    await transaction.commit();
    if (!user) {
      return res.status(404).json({ message: 'user doesnot exist' });
    }
    const passBool = Auth.comparePassword(password, user.password);
    const { username } = user;
    if (passBool) {
      return res.status(200).json({
        message: 'logged in',
        user: {
          token: Auth.genToken(username, email),
          username,
          email: user.email,
        },
      });
    }
    return res.status(401).json({ message: 'wrong username or password' });
  } catch (ex) {
    await transaction.rollback();
    return res.json({ message: ex });
  }
};
