import dotenv from 'dotenv';
import Auth from '../helpers/auth';

dotenv.config();

class AuthMiddleware {
  static async verifyToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      try {
        const user = await Auth.decodeToken(token);
        // if user exist with decoded credentials
        if (user) {
          req.user = user;
          return next();
        }
        return res.status(400).send({ error: 'Invalid token' });
      } catch (error) {
        // Throw an error just in case anything goes wrong with verification
        return res.send({ error });
      }
    }
    // Forbidden
    return res.status(403).send({ error: 'Unauthorized' });
  }
}

export default AuthMiddleware;
