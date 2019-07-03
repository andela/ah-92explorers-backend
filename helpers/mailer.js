import nodemailer from 'nodemailer';
import { email } from '../config/index';
import Templates from './emailTemplates';

const { emailTemplates } = Templates;

class Mailer {
  constructor(_userEmail) {
    this.userEmail = _userEmail;
    this.senderEmail = email.user;
    this.senderPass = email.pass;
  }

  addTokenToEmail(token, template) {
    return async (resolve, reject) => {
      const mailOptions = emailTemplates[template];
      mailOptions.from = this.senderEmail;
      mailOptions.to = this.userEmail;
      const addToken = mailOptions.html.replace('$token', token);
      mailOptions.html = addToken;
      try {
        const response = await this.sendEmail(mailOptions);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    };
  }

  sendEmail(mailOptions) {
    return async (resolve, reject) => {
      const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.senderEmail,
          pass: this.senderPass
        }
      });
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(`Email sent: ${info.response}`);
        }
      });
    };
  }
}
export default Mailer;
