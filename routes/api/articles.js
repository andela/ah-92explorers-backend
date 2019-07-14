import express from 'express';
import article from '../../controllers/article';
import bookmark from '../../controllers/bookmark';
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

/**
* @swagger
*  /api/articles/{slug}/share/{channel}:
*    post:
*      security:
*       - bearerAuth: []
*      tags:
*        - Articles
*      summary: Share an article
*      description: returns the status and message.
*      produces:
*        - application/json
*      parameters:
*        - in: path
*          name: slug
*          schema:
*            type: string
*          required: true
*          description: The author username
*        - in: path
*          name: channel
*          schema:
*            type: string
*          required: true
*          description: Channel have to be either facebook, twitter  or mail
*      responses:
*        200:
*          description: The success message
*        400:
*          description: channel must be one of facebook, twitter, mail
*        404:
*          description: Article is not found.
*/
router.post('/articles/:slug/share/:channel', article.shareArticle);

/**
* @swagger
*  /articles/{slug}/bookmark:
*   post:
*      tags:
*        - Articles
*      summary: Bookmark an article
*      description:
*        Authentication required, returns a bookmarked article. No additional
*        parameters required
*      produces:
*        - application/json
*      parameters:
*        - in: path
*          name: slug
*          schema:
*            type: string
*          required: true
*          description: The artice will be bookmarked
*      responses:
*        200:
*          description: Successful operation
*        404:
*          description: Article not found
*/
router.post('/articles/:slug/bookmark', checkToken, bookmark.bookmark);
/**
* @swagger
*  /bookmark:
*    get:
*      tags:
*        - Articles
*      summary: View all the bookmarked articles
*      description:
*        Authentication required, returns the bookmarked articles of the authenticated
*        user. No additional parameters required
*      produces:
*        - application/json
*      responses:
*        200:
*          description: Successful operation
*        401:
*          description: Unauthorized access
*/
router.get('/bookmark', checkToken, bookmark.getBookmarks);
/**
* @swagger
* /articles/{slug}/bookmark:
*    delete:
*      tags:
*        - Articles
*      summary: Unbookmark an article
*      description:
*        Authentication required, returns an unbookmarked article. No additional
*        parameters required
*      produces:
*        - application/json
*      parameters:
*        - in: path
*          name: slug
*          description: The article will be unbookmarked
*          required: true
*          type: string
*      responses:
*        200:
*          description: successful operation
*        404:
*          description: Article not found
*/
router.delete('/articles/:slug/bookmark', checkToken, bookmark.unBookmark);

export default router;
