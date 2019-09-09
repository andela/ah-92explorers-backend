import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import user from './index.test';
import db from '../models';

chai.use(chaiHttp);

const token = [];

describe('User Authentication Routes', () => {
  before(() => {
    db.users.destroy({
      where: {
        email: user.userTrue.email
      }
    });
  });
  it('should signup user with valid crendentials', (done) => {
    chai.request(app)
      .post('/api/users')
      .send(user.userTrue)
      .then((res) => {
        expect(res.statusCode).to.be.equal(201);
        expect(res.body).to.be.an('object');
        expect(typeof res.body.user.token).to.be.equal('string');
        expect(res.body.user.username).to.be.equal(user.userTrue.username);
        expect(typeof res.body.user.email).to.be.equal('string');
        expect(res.body.user.email).to.be.equal(user.userTrue.email);
        expect(res.body.message).to.be.equal('created successfully');
        done();
      })
      .catch(err => done(err));
  });
  it('should login user with valid credentials', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(user.login)
      .then((res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(typeof res.body.user.token).to.be.equal('string');
        expect(Object.keys(res.body.user).length).to.be.equal(5);
        expect(res.body.user.username).to.be.equal(user.userTrue.username);
        expect(typeof res.body.user.email).to.be.equal('string');
        expect(res.body.user.email).to.be.equal(user.userTrue.email);
        expect(res.body.message).to.be.equal('logged in');
        token.push(res.body.user.token);
        done();
      })
      .catch(err => done(err));
  });
  it('should not login user with invalid email id', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(user.invalidDummy1)
      .then((res) => {
        expect(res.statusCode).to.be.equal(404);
        expect(res.body.error).to.be.equal('user not found');
        done();
      })
      .catch(err => done(err));
  });
  it('should not login user with invalid password', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send({
        email: user.userTrue.email,
        password: 'Alpha123$111'
      })
      .then((res) => {
        expect(res.statusCode).to.be.equal(401);
        expect(res.body.error).to.be.equal('wrong username or password');
        done();
      })
      .catch(err => done(err));
  });
  it('should not signup user with already existing credentials', (done) => {
    chai.request(app)
      .post('/api/users')
      .send(user.userTrue)
      .then((res) => {
        expect(res.statusCode).to.be.equal(409);
        done();
      })
      .catch(err => done(err));
  });
});

describe('Authenticated User Signout', () => {
  it('should signout a logged in  user', (done) => {
    chai.request(app)
      .post('/api/users/signout')
      .set('Authorization', `Bearer ${token[0]}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(body).to.have.property('message');
        expect(body.message).to.equals('successfully signed out');
        done();
      });
  });

  it('should not signout a user if he/she is already logged out', (done) => {
    chai.request(app)
      .post('/api/users/signout')
      .set('Authorization', `Bearer ${token[0]}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(401);
        expect(body).to.have.property('error');
        expect(body.error).to.equals('please login/signup to access this resource');
        done();
      });
  });
});
