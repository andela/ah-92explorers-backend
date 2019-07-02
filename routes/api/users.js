import express from 'express';
import { signup, signin } from '../../controllers';
import Validations from '../../middlewares/validations/validations';

const router = express.Router();
/**
* @swagger
* /api/users:
*   post:
*     tags:
*       - Auth
*     name: Signup
*     summary: Signs up in a User/Admin
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           username:
*             type: string
*             example: abel
*           firstName:
*             type: string
*             example: jojo
*           lastName:
*             type: string
*             example: abtex
*           email:
*             type: string
*             example: abtex@gmail.com
*           password:
*             type: string
*             format: password
*             example: stealth
*         required:
*           - username
*           - firstName
*           - lastName
*           - email
*           - password
*     responses:
*       201:
*         description: User creeated
*/
router.post('/users', Validations.validateCreateUser, signup);

/**
* @swagger
* /api/users/login:
*   post:
*     tags:
*       - Auth
*     name: Signin
*     summary: Signs in in a User/Admin
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           email:
*             type: string
*             example: abtex@gmail.com
*           password:
*             type: string
*             format: password
*             example: stealth
*         required:
*           - email
*           - password
*     responses:
*       200:
*         description: User Has Successfully Logged In
*       401:
*         description: Invalid Email or Password
*/
router.post('/users/login', Validations.validateSiginUser, signin);

export default router;
