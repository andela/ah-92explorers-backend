import express from 'express';
import passport from '../../middlewares/passport';
import {
  signup, signin, verifyUser, signoutUser
} from '../../controllers';
import Validations from '../../middlewares/validations/validations';
import { checkToken } from '../../middlewares';
import socialAuth from '../../controllers/socialAuth';

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
*             example: abtexi@gmail.com
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
// social login router
router.post('/users/login', Validations.validateSiginUser, signin);
// facebook router
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook'), socialAuth.userFacebookGoogle);
// google router
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback', passport.authenticate('google'), socialAuth.userFacebookGoogle);
// twitter router
router.get('/auth/twitter', passport.authenticate('twitter', { scope: ['email', 'profile'] }));

router.get('/auth/twitter/callback', passport.authenticate('twitter'), socialAuth.userTwitter);

router.get('/users/verify/:token', verifyUser);

router.post('/users/signout', checkToken, signoutUser);

export default router;
