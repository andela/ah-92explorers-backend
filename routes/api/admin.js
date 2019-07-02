import express from 'express';
import userController from '../../controllers/admin';
import validators from '../../middlewares/validations/validations';

const router = express.Router();
router.post('/admin/users', validators.validateCreateUser, userController.createUser);
router.get('/admin/users', userController.getUsers);
router.patch('/admin/users/:userId', userController.updateUser);
router.delete('/admin/users/:userId', userController.deleteUser);

export default router;
