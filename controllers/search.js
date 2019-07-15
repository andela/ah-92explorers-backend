import searchAlgolia from 'algoliasearch';
import dotenv from 'dotenv';
import db from '../models';
import { sanitize } from '../helpers/searchSanitizer';

dotenv.config();
const { articles } = db;
export const search = async (req, res) => {
  const client = searchAlgolia(process.env.ALGO_APP_ID, process.env.ALGO_SEARCH_ONLY);
  const index = client.initIndex('authors_haven');
  const {
    tag,
    author,
    title,
    keyword
  } = req.query;
  try {
    const articlesResults = await articles.findAll();
    index.addObjects(articlesResults);
    index.search(`${tag || author || title || keyword}`, (err, results) => {
      const sanitizedResults = sanitize(results.hits);
      if (sanitizedResults.length !== 0) {
        return res.status(200).json({ results: sanitizedResults, });
      }
      return res.status(204).json({ error: 'no results' });
    });
  } catch (ex) {
    return res.status(500).json({
      error: 'something went wrong',
    });
  }
};
