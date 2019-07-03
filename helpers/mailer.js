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
   * @return {Promise} resolve or reject
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
