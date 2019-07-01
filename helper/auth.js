/**
 * put all your auth logic here
 * as long as its not a middleware
 */

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
* @swagger
* /gentoken:
*   get:
*     tags:
*       - Auth
*     name: JWT
*     summary: generates user JsonWebToken
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           Email:
*             type: string
*             example: eleman@gmail.com
*         required:
*           - Email
*     responses:
*       200:
*         description: Token generated
*/

export const genToken = (email) => {
  const token = jwt.sign({
    email,
  }, process.env.secret, { expiresIn: '24h' });
  return token;
};
