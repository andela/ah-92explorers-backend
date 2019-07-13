import express from 'express';
import article from '../../controllers/articleController';
import { checkingArticle } from '../../middlewares/article';
import auth from '../../middlewares/auth';

const router = express.Router();

// @Method GET
// @Desc get all created articles, Authentication required
router.get('/articles/feed', auth.verifyToken, article.index);
// @Method POST
// @Desc create article, Authentication required
router.post('/articles', auth.verifyToken, article.create);
// @Method GET
// @Desc get single article, No authentication required
router.get('/articles/:slug', article.show);
// @Method PUT
// @Desc update article, Authentication required
router.put('/articles/:slug', auth.verifyToken, checkingArticle, article.update);
// @Method Delete
// @Desc delete article, Authentication required
router.delete('/articles/:slug', auth.verifyToken, checkingArticle, article.delete);

export default router;
