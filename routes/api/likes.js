import express from 'express';
import { checkToken } from '../../middlewares';
import likeController from '../../controllers/likes';

const router = express.Router();
router.post('/like/:articleSlug', checkToken, likeController.likeArticle);
router.post('/dislike/:articleSlug', checkToken, likeController.dislikeArticle);
router.post('/favorite/:articleSlug', checkToken, likeController.likeArticle);

export default router;
