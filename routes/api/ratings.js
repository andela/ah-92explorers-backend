import express from 'express';
import { checkToken } from '../../middlewares/checkToken';
import ratingController from '../../controllers/rating';
import ratingValidations from '../../middlewares/validations/ratingValidations';

const router = express.Router();

// @Method POST
// @Desc rate an article, Authentication required
/**
* @swagger
* /api/article/{articleSlug}/rate:
*   post:
*     security:
*       - bearerAuth: []
*     tags:
*       - Article
*     name: Rate article
*     summary: Rate an article
*     consumes:
*       - application/json
*     parameters:
*       - name: articleSlug
*         in: path
*         required: true
*         description: article slug that represents an article
*         type: string
*       - name: rating
*         in: body
*         properties:
*           rating:
*             type: number
*             example: 4
*         required:
*           - rating
*     responses:
*       200:
*         description: Article already rated
*       201:
*         description: rate article success
*       400:
*         description: Slug is required
*/

router.post('/article/:articleSlug/rate', checkToken, ratingValidations.validateRating, ratingController.rateArticle);
router.get('/article/:articleSlug/rating', ratingController.getRating);

export default router;
