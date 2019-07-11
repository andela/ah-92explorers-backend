import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import sendGridMailer from '@sendgrid/mail';
import app from '../index';
import user from './index.test';
import Auth from '../helpers/auth';


chai.use(chaiHttp);

dotenv.config();
sendGridMailer.setApiKey(process.env.SENDGRID_API_KEY);
const { username, email } = user.login;
const token = Auth.genToken(username, email);
let uname;

describe('GET /api/user/verify', () => {
  before(() => {
    chai
      .request(app)
      .post('/api/users')
      .send(user.emailVerification)
      .end((err, res) => {
        uname = res.body.username;
      });
  });
  it('verify a registered user', () => {
    chai
      .request(app)
      .get(`/api/users/verify/${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('user has been verified');
      });
  });
});

describe('SEND mail with sendgrid', () => {
  it('should send mail', () => {
    const msg = {
      to: 'isaiah@gmail.com',
      from: 'authorshaven92@gmail.com',
      subject: 'Account Verification',
      html: `<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px;">
      <h1 style="color: #444;">Authors Haven</h1>
      <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Welcome ${uname},<br> We are happy to have you onboard. Please verify your mail to enjoy premium access.<br> Click the blue button below to verify your account.</p>
      <p><a style="background-color: #3097d1; border: 2px solid #3097d1; padding: 8px; color: #fff; font-size: 16px; text-decoration: none;cursor: pointer;" href="${process.env.HOST}/api/v1/user/verify/${token}">Verify Account</a>
      </a></p>
      <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our application!</p>
      <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;">Regards,<br>Authors Haven</p>
      </div>`,
    };
    sendGridMailer.send(msg, (err) => {
      expect(err).to.eql(null);
    });
  });
});
