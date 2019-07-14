import express from 'express';
import article from '../../controllers/article';
import { createComment } from '../../controllers/comment';
import { checkArticleOwner } from '../../middlewares/checkResourceOwner';
import validate from '../../middlewares/validations/articleValidations';
import uploadImage from '../../middlewares/imageUpload';
import { checkToken } from '../../middlewares';

const router = express.Router();

// @Method GET
// @Desc get all created articles, Authentication required
/**
* @swagger
* /api/articles/feed:
*   get:
*     security:
*       - bearerAuth: []
*     tags:
*       - Article
*     name: Get articles
*     summary: Retrieve all articles
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Articles
*/
router.get('/articles/feed', article.retrieveArticles);

// @Method POST
// @Desc create article, Authentication required
/**
* @swagger
* /api/articles:
*   post:
*     security:
*       - bearerAuth: []
*     tags:
*       - Article
*     name: Create article
*     summary: Create an article
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           title:
*             type: string
*             example: Lorem upsolum
*           description:
*             type: string
*             example: Lorem upsolum Lorem
*           body:
*             type: string
*             example: Lorem upsolum Lorem upsolumLorem upsolumLorem upsolumLorem
*           taglist:
*             type: array
*             example: JS, programming
*         required:
*           - title
*           - body
*     responses:
*       201:
*         description: Article created successfully
*/
router.post('/articles', checkToken, uploadImage, validate.validateCreateArticle, article.createArticle);

// @Method GET
// @Desc get single article, No authentication required
/**
* @swagger
* /api/articles/{slug}:
*   get:
*     tags:
*       - Article
*     name: show article
*     summary: Get single article
*     consumes:
*       - application/json
*     parameters:
*       - name: slug
*         in: path
*         required: true
*         description: slug that represents an article
*         type: string
*     responses:
*       200:
*         description: Single article
*/
router.get('/articles/:slug', article.getSingleArticle);

// @Method PUT
// @Desc update article, Authentication required
/**
* @swagger
* /api/articles/{slug}:
*   put:
*     security:
*       - bearerAuth: []
*     tags:
*       - Article
*     name: Update article
*     summary: Update an article
*     consumes:
*       - application/json
*     parameters:
*       - name: slug
*         in: path
*         required: true
*         description: slug that represents an article
*         type: string
*       - name: body
*         in: body
*         properties:
*           title:
*             type: string
*             example: Lorem upsolum
*           description:
*             type: string
*             example: Lorem upsolum Lorem
*           body:
*             type: string
*             example: Lorem upsolum Lorem upsolumLorem upsolumLorem upsolumLorem
*           taglist:
*             type: array
*             example: JS, programming
*         required:
*           - title
*           - body
*     responses:
*       201:
*         description: Article updated successfully
*/
router.put('/articles/:slug', checkToken, checkArticleOwner, uploadImage, validate.validateUpdateArticle, article.updateArticle);


// @Method Delete
// @Desc delete article, Authentication required
/**
* @swagger
* /api/articles/{slug}:
*   delete:
*     security:
*       - bearerAuth: []
*     tags:
*       - Article
*     name: delete article
*     summary: delete single article
*     consumes:
*       - application/json
*     parameters:
*       - name: slug
*         in: path
*         required: true
*         description: slug that represents an article
*         type: string
*     responses:
*       200:
*         description: Article deleted successfully
*/
router.delete('/articles/:slug', checkToken, checkArticleOwner, article.deleteArticle);
/**
* @swagger
* /api/articles/{:slug}/comments:
*   post:
*     security:
*       - bearerAuth: []
*     tags:
*       - Article
*     name: Comment
*     summary: Enables user to comment on an article
*     consumes:
*       - application/json
*     parameters:
*       - name: ":slug"
*         in: path
*         description: article slug
*         required: true
*         type: string
*       - name: body
*         in: body
*         properties:
*           body:
*             type: string
*             example: I finally learnt how to train my dragon. Thanks
*         required:
*           - body
*     responses:
*       201:
*         description: commented
*       400:
*         description: commenting failed
*/
router.post('/articles/:slug/comments', checkToken, createComment);

export default router;
