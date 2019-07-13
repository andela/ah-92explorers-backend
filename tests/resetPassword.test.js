import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models';
import app from '../index';
import Auth from '../helpers/auth';

chai.use(chaiHttp);
chai.should();
dotenv.config();

const { users } = models;
const { SECRET } = process.env;

describe('Reset Password via email', () => {
  const newUser = {
    username: 'hervera',
    email: 'nkuliherve@gmail.com',
    password: Auth.hashPassword('Alpha123$'),
  };
  const wrongEmail = 'nkuliherveezusss2999@gmail.com';
  const newUserToken = jwt.sign({ email: newUser.email }, SECRET, { expiresIn: '1d' });
  before(async () => {
    try {
      await users.destroy({
        where: {
          email: newUser.email,
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  before(async () => {
    try {
      return await users.create(newUser);
    } catch (error) {
      throw error;
    }
  });

  it('should not send an email when the email doesn\'t exist', (done) => {
    chai.request(app)
      .post('/api/password')
      .send({
        email: wrongEmail,
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('The email provided does not exist');
        done();
      });
  });

  it('should send a reset password link when the email exist', (done) => {
    chai.request(app)
      .post('/api/password')
      .set('Content-Type', 'application/json')
      .send({ email: 'nkuliherve@gmail.com' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('We have e-mailed a password reset link, Check your email!');
        done();
      });
  });

  it('should get a token after clicking on password reset button', (done) => {
    chai.request(app)
      .get(`/api/reset-password/${newUserToken}`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('token');
        res.body.should.have.property('token').eql(newUserToken);
        done();
      });
  });

  it('should reset password and return a successful message', (done) => {
    chai.request(app)
      .put('/api/password')
      .send({
        token: newUserToken,
        password: '!Mysecret@45',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Your password was reset successfully');
        done();
      });
  });

  it('should not reset password if the password is invalid', (done) => {
    chai.request(app)
      .put('/api/password')
      .send({ password: 'ggggg' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not reset password if the token is invalid', (done) => {
    chai.request(app)
      .put('/api/password')
      .send({
        token: 'xcsdwessedarrd',
        password: '!Mysecret@45',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('Invalid token');
        done();
      });
  });
});
