import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import user from './index.test';
import db from '../models';

chai.use(chaiHttp);

const invalidDummy = {
  email: 'love123@gmail.com',
  password: 'Alpha13$',
};

const invalidDummy1 = {
  email: 'love23@gmail.com',
  password: 'Alpha123$',
};

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
        expect(Object.keys(res.body.user).length).to.be.equal(3);
        expect(res.body.user.username).to.be.equal(user.userTrue.username);
        expect(typeof res.body.user.email).to.be.equal('string');
        expect(res.body.user.email).to.be.equal(user.userTrue.email);
        expect(res.body.message).to.be.equal('logged in');
        done();
      })
      .catch(err => done(err));
  });
  it('should not login user with invalid email id', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(invalidDummy1)
      .then((res) => {
        expect(res.statusCode).to.be.equal(404);
        expect(res.body.message).to.be.equal('user not found');
        done();
      })
      .catch(err => done(err));
  });
  it('should not login user with invalid password', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(invalidDummy)
      .then((res) => {
        expect(res.statusCode).to.be.equal(401);
        expect(res.body.message).to.be.equal('wrong username or password');
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
