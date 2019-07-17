import models from '../models/index';

const { articles, users } = models;

/* @middleware which find if article is exist and
check if user is allowed to update or delete article
*/
export const checkArticleOwner = async (req, res, next) => {
  try {
    const article = await articles.findOne({ where: { slug: req.params.slug } });
    const author = await users.findOne({ where: { email: req.decoded.email } });
    if (!article) {
      return res.status(404).json({ error: 'sorry the requested article could not be found.' });
    }
    // @check if authors are the same
    if (article.authorId !== author.id) {
      return res.status(403).json({ error: 'permission denied, you are not allowed to perform this action.' });
    }
    req.findArticle = article;
    next();
  } catch (error) {
    return res.status(500).json({ error: `something wrong please try again. ${error}` });
  }
};
