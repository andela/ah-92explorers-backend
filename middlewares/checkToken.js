import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import client from '../helpers/redis';

dotenv.config();
export const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : req.headers.authorization; // Fetch the token and check if it exists in the redis db
    const tokenFound = await client.getAsync(token);
    switch (true) {
      case token === undefined:
        return res.json({
          error: 'unauthorised to use this resource, please signup/login',
        });
      case tokenFound === 'Blacklisted':
        return res.status(401).json({
          error: 'please login/signup to access this resource'
        });
      case tokenFound === null:
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
          if (error) {
            return res.status(401).json({
              error: 'unauthorised to use this resource, please signup/login',
            });
          }
          req.decoded = decoded;
          next();
        });
    }
  } catch (error) {
    return res.status(401).json({
      error: 'unauthorised to use this resource, please signup/login'
    });
  }
};
