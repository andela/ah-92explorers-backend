import express from 'express';
import { checkToken } from '../../middlewares';
import likeController from '../../controllers/likes';
import CommentLikes from '../../controllers/likeComment';

const router = express.Router();
router.post('/like/:articleSlug', checkToken, likeController.likeArticle);
router.post('/dislike/:articleSlug', checkToken, likeController.dislikeArticle);
router.post('/favorite/:articleSlug', checkToken, likeController.likeArticle);


// @Method POST
// @Desc like a comment, Authentication required
/**
* @swagger
* /api/article/comment/{commentId}/like:
*   post:
*     security:
*       - bearerAuth: []
*     tags:
*       - Like
*     name: like a comment
*     summary: Like a comment on article
*     consumes:
*       - application/json
*     parameters:
*       - name: commentId
*         in: path
*         required: true
*         description: commentId that represents a comment
*         type: string
*     responses:
*       201:
*         description: you liked a comment
*       200:
*         description: you unliked a comment
*       401:
*         description: unauthorised to use this resource, please signup/login
*       500:
*         description: Failed to like this comment, please try again
*/

router.post('/article/comment/:commentId/like', checkToken, CommentLikes.likeComment);

export default router;
