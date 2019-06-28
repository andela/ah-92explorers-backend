import dotenv from "dotenv";
import db from "../models/databaseUrl";
dotenv.config();

class WelcomeController {
  static welcome(req, res) {
    res.status(200).json({
      msg: "Welcome to Authors Haven API, a #92Explorers Product."
    });
  }
}

export default WelcomeController;
