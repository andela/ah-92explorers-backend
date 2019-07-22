import db from '../models';

const {
  comments, sequelize, articles, users,
} = db;
export const createComment = async (req, res) => {
  const { body } = req.body;
  const { slug } = req.params;
  const { username } = req.decoded;
  const transaction = await sequelize.transaction();
  try {
    const article = await articles.findOne({
      where: {
        slug,
      }
    });
    const user = await users.findOne({
      where: { username, }
    });
    if (article && user) {
      const articleId = article.id;
      const comment = await comments.create({
        body, articleId, authorId: user.id
      }, { transaction });
      await transaction.commit();
      if (comment) {
        const showComment = await comments.findByPk(comment.id, {
          include: [{
            as: 'author', model: users, attributes: ['username'],
          }],
        });
        const {
          author, createdAt, updatedAt,
        } = showComment;
        const articleRef = {
          slug: article.slug
        };
        return res.status(201).json({
          message: 'commented',
          comment: {
            body: showComment.body,
            author,
            article: articleRef,
            createdAt,
            updatedAt,
          },
        });
      }
    }
    return res.status(404).json({ error: 'article or user not found' });
  } catch (ex) {
    await transaction.rollback();
    res.status(400).json({
      error: 'commenting failed'
    });
  }
};
