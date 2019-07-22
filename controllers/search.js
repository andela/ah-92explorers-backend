import searchAlgolia from 'algoliasearch';
import dotenv from 'dotenv';
import db from '../models';
import { sanitize } from '../helpers/searchSanitizer';

dotenv.config();
const { articles, users } = db;
export const search = async (req, res) => {
  const arrayResults = [];
  const client = searchAlgolia(process.env.ALGO_APP_ID, process.env.ALGO_SEARCH_ONLY);
  const index = client.initIndex('authors_haven');
  const {
    tag,
    author,
    title,
    keyword
  } = req.query;
  try {
    const articlesResults = await articles.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: users,
          as: 'author',
          attributes: ['username', 'email', 'id']
        }
      ]
    });

    articlesResults.map((e) => {
      arrayResults.push({
        id: e.id,
        title: e.title,
        slug: e.slug,
        description: e.description,
        body: e.body,
        tagList: e.tagList,
        image: e.image,
        author: e.author,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt
      });
      return arrayResults;
    });

    index.addObjects(arrayResults);
    index.search(`${tag || author || title || keyword}`, (err, results) => {
      const sanitizedResults = sanitize(results.hits);
      if (sanitizedResults.length !== 0) {
        return res.status(200).json({ results: sanitizedResults, });
      }
      return res.status(404).json({ error: 'no results' });
    });
  } catch (ex) {
    return res.status(500).json({
      error: 'something went wrong',
    });
  }
};
