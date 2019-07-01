import dotenv from 'dotenv';
import { genToken } from '../helper/auth';

dotenv.config();

class WelcomeController {
  static welcome(req, res) {
    res.status(200).json({
      msg: 'Welcome to Authors Haven API, a #92Explorers Product.'
    });
  }

  static gentoken(req, res) {
    res.status(200).json({
      token: genToken('elemanhillary@gmail.com'),
    });
  }
}

export default WelcomeController;
