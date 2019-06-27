import dotenv from "dotenv";
import db from "../models/databaseUrl";
dotenv.config();

class WelcomeController {
  static welcome(req, res) {
    res
      .status(200)
      .send(
        "Welcome to Authors Haven - A Social platform for the creative at heart."
      );
    res.status(400).send("Server Error");
  }
}

export default WelcomeController;
