import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models';

dotenv.config();

const { users } = models;

export const checkAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const decode = jwt.decode(token, process.env.SECRET);
  const { email } = decode;
  const foundUser = await users.findOne({
    where: {
      email
    },
    attributes: ['accessLevel']
  });

  switch (true) {
    case !foundUser:
      return res.status(404).json({
        error: 'failed to access resource'
      });
    case foundUser.accessLevel < 1:
      return res.status(403).json({
        error: 'permission to access this resource has been denied'
      });
  }
  next();
};
