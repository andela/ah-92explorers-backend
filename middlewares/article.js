import models from '../models/index';

const { articles, users } = models;

/* @middleware which find if article is exist and
check if user is allowed to update or delete article
*/
export const checkingArticle = async (req, res, next) => {
  try {
    const findArticle = await articles.findOne({ where: { slug: req.params.slug } });
    const findUser = await users.findOne({ where: { email: req.user.email } });
    if (!findArticle) {
      return res.status(404).json({ error: 'sorry the requested article could not be found.' });
    }
    // @check if authors are the same
    if (findArticle.author !== findUser.id) {
      return res.status(403).json({ error: 'permission denied, you are not allowed to perform this action.' });
    }
    req.findArticle = findArticle;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Something wrong please try again later.' });
  }
};
