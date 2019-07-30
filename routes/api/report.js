import express from 'express';
import { checkToken } from '../../middlewares/checkToken';
import validate from '../../middlewares/validations/reportValidations';
import reportController from '../../controllers/report';

const router = express.Router();

/**
 * Authenticated user can report an article.
 */
router.post(
  '/report/articles/:slug',
  checkToken, validate.validateCreateReport,
  reportController.reportArticle
);

/**
 * Only admin will be able to see reported article.
 */
router.get(
  '/reports/articles',
  checkToken,
  reportController.getAllReportedArticle
);

/**
 * Only user will be able to see his/her reported article.
 */
router.get(
  '/report/articles',
  checkToken,
  reportController.getMyReportedArticle
);

/**
 * Only admin will be able to delete reported article.
 */
router.delete(
  '/reports/article/:slug',
  checkToken,
  reportController.deleteReportedArticle
);

export default router;
