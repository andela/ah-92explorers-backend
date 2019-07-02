import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dontenv from 'dotenv';

dontenv.config();

class Auth {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static genToken(username, email) {
    const token = jwt.sign({
      email,
      username,
    }, process.env.SECRET, { expiresIn: '24h' });
    return token;
  }

  static decodeToken(token) {
    let payload = '';
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      payload = decoded;
    });
    return payload;
  }
}

export default Auth;
