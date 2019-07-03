import nodemailer from 'nodemailer';
import { email } from '../config/index';
import Templates from './emailTemplates';

const { emailTemplates } = Templates;
/**
 * Class module to send email
 * @exports
 * @class
 */
class Mailer {
  /**
   * Initialize user and pass
   * @constructor
   * @param {string} _userEmail - User email
   */
  constructor(_userEmail) {
    this.userEmail = _userEmail;
    this.senderEmail = email.user;
    this.senderPass = email.pass;
  }

  /**
 * Adds a token.
 * @param {string} token token
 * @param {string} template email.
 * @returns {object} response.
 */
  async addTokenToEmail(token, template) {
    const mailOptions = emailTemplates[template];
    mailOptions.from = this.senderEmail;
    mailOptions.to = this.userEmail;
    const addToken = mailOptions.html.replace('$token', token);
    mailOptions.html = addToken;
    try {
      const response = await this.sendEmail(mailOptions);
      return response;
    } catch (error) {
      return `${error}`;
    }
  }

  /**
   * Send email
   * @param {Object} mailOptions - Email template
   * @returns {object} response.
   */
  async sendEmail(mailOptions) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.senderEmail,
        pass: this.senderPass
      }
    });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      }
      return `Email sent: ${info.response}`;
    });
  }
}
export default Mailer;
