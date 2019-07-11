import dotenv from 'dotenv';
import ars from 'arslugify';
import models from '../models';

const { articles, users } = models;


dotenv.config();

class ArticleController {
  static async create(req, res) {
    const {
      title, body, author,
    } = req.body;
    const randnbr = Math.floor((Math.random() * 10000) + 1);
    const clientUrl = (process.env.NODE_ENV === 'production') ? 'https://ah-92explorers-api.herokuapp.com' : 'http://127.0.0.1:3000';
    try {
      const article = await articles.create({
        title,
        slug: `${ars(title)}-${randnbr}`,
        body,
        author,
        image: (req.file ? req.file.url : null)
      });

      const user = await users.findOne({
        where: {
          id: article.author
        }
      });
      const payload = {
        title: article.title,
        body: article.body,
        author: user.username,
        url: `${clientUrl}/${article.slug}`,
      };
      res.status(201).json({ status: 201, message: 'Article created successfully', article: payload });
    } catch (error) {
      res.status(500).json({ error: `something wrong please try again. ${error}` });
    }
  }
}


export default ArticleController;
