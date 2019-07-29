import db from '../../models';

const {
  articles
} = db;

export const checkHighlightAndComment = async (req, res, next) => {
  const {
    highlight, startIndex, stopIndex, comment
  } = req.body;
  const { articleSlug } = req.params;
  const article = await articles.findOne({
    where: { slug: articleSlug }
  });
  if (!article) {
    return res.status(404).json({ error: 'failed to find article' });
  }
  switch (true) {
    case highlight === null || highlight === undefined
      || highlight === '' || startIndex === null
      || startIndex === undefined || startIndex === ''
      || stopIndex === null || stopIndex === undefined
      || stopIndex === '' || comment === null
      || comment === undefined || comment === '':
      return res.status(400).json({ error: 'highlight, startIndex, stopIndex and comment cannot be left empty' });
    case typeof startIndex === 'string' || stopIndex === 'string':
      return res.status(400).json({ error: 'startIndex and stopIndex can only be number' });
    case stopIndex > article.body.length:
      return res.status(400).json({ error: 'stopIndex is invalid' });
    case startIndex < 0:
      return res.status(400).json({ error: 'startIndex is invalid' });
  }
  next();
};
