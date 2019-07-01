import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const checkToken = (req, res, next) => {
  let token = req.headers.authorization || req.headers['x-access-token'];
  if (token === undefined) {
    return res.json({
      message: 'token undefined',
    });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.secret, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'token empty',
    });
  }
};
