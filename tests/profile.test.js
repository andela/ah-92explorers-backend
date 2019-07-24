/* eslint-disable no-unused-vars */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../models';
import user from './index.test';

chai.use(chaiHttp);
const { expect } = chai;

let tokenGen;
let userName;

describe('User Profile', () => {
  it('should be able to sign in', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(user.adminLogin)
      .end((req, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('message');
        expect(body).to.have.property('user');
        expect(body.user).to.have.property('email');
        expect(body.user).to.have.property('username');
        expect(body.user).to.have.property('token');
        expect(body.message).to.equals('logged in');
        tokenGen = body.user.token;
        done();
      });
  });

  it('should enable user to see his/her profile after signup', (done) => {
    chai.request(app)
      .get('/api/profiles/akramTinny')
      .set('Authorization', `Bearer ${tokenGen}`)
      .end((req, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('message');
        expect(body).to.have.property('profile');
        expect(body.profile).to.have.property('firstName');
        expect(body.profile).to.have.property('lastName');
        expect(body.profile).to.have.property('username');
        expect(body.profile).to.have.property('phone');
        expect(body.profile).to.have.property('facebook');
        expect(body.profile).to.have.property('twitter');
        expect(body.profile).to.have.property('linkedIn');
        expect(body.profile).to.have.property('instagram');
        expect(body.profile).to.have.property('location');
        expect(body.message).to.equals('User profile retrieved!');
        done();
      });
  });

  it('should not see profile if the username does not exist', (done) => {
    chai.request(app)
      .get('/api/profiles/jjdsjnjdj')
      .set('Authorization', `Bearer ${tokenGen}`)
      .end((req, res) => {
        const { status, body } = res;
        expect(status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('error');
        expect(body.error).to.equals('User does not exists!');
        done();
      });
  });

  it('User should be able to update its profile', (done) => {
    chai.request(app)
      .patch('/api/profiles')
      .set('Authorization', `Bearer ${tokenGen}`)
      .send(user.profile)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('message');
        expect(body).to.have.property('profile');
        expect(body.profile).to.have.property('firstName');
        expect(body.profile).to.have.property('lastName');
        expect(body.profile).to.have.property('bio');
        expect(body.profile).to.have.property('phone');
        expect(body.profile).to.have.property('facebook');
        expect(body.profile).to.have.property('twitter');
        expect(body.profile).to.have.property('linkedIn');
        expect(body.profile).to.have.property('instagram');
        expect(body.profile).to.have.property('location');
        expect(body.message).to.equals('User profile updated!');
        done();
      });
  });
  it('should not update profile if the token is not provided', (done) => {
    chai.request(app)
      .patch('/api/profiles/')
      .send(user.profile)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('error');
        expect(body.error).to.equals('unauthorised to use this resource, please signup/login');
        done();
      });
  });


  // list users functionality
  it('Should list users functionality', (done) => {
    chai.request(app)
      .get('/api/list-users')
      .set('Content-Type', 'application/json')
      .set('Authorization', tokenGen)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('users');
        expect(Object.prototype.toString.call(res.body.users)).to.be.equal('[object Array]');
        done();
      });
  });
  // list users functionality
  it('Should not list users functionality if user is not authorised', (done) => {
    chai.request(app)
      .get('/api/list-users')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'zzxxxxxxxxxxxz')
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('error');
        expect(body.error).to.equals('unauthorised to use this resource, please signup/login');
        done();
      });
  });
});
