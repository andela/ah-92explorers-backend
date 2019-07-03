import dotenv from 'dotenv';

dotenv.config();
const clientUrl = (process.env.NODE_ENV === 'production') ? 'https://ah-92explorers-api.herokuapp.com' : 'http://127.0.0.1:3000';

const emailTemplates = {
  resetPassword: {
    from: '',
    to: '',
    subject: 'Password reset',
    html: `<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px;">
    <h1 style="color: #444;">Authors Haven</h1>
    <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">You are receiving this email because we received a password reset request for your account. Click the blue button below to reset the password. If you did not request a password reset, no further action is required.</p>
    <p><a style="background-color: #3097d1; border: 2px solid #3097d1; padding: 8px; color: #fff; font-size: 16px; text-decoration: none;cursor: pointer;" href="${clientUrl}/api/reset-password/$token">Reset Password</a>
    </a></p>
    <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our application!</p>
    <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;">Regards,<br>Authors Haven</p>
    </div>`
  },
};


export default { emailTemplates };
