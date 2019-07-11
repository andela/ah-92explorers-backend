import express from 'express';
import passport from 'passport';
import Article from '../../controllers/articleController';

const router = express.Router();

const auth = passport.authenticate('jwt', {
  session: false
});

router.post('/articles', auth, Article.create);

// router.get('/', article.getArticle);
// router.get('/:articleId', isAuth, article.getSingleArticle);
// router.put('/:articleId', auth, checkingArticle, uploadImage, article.updateArticle);
// router.delete('/:articleId', auth, checkingArticle, article.deleteArticle);


export default router;
