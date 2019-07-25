import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import user from './index.test';

chai.use(chaiHttp);
const { expect } = chai;

let tokenGen1;
let tokenGen2;
const userName1 = 'akramTinny';
const userName2 = 'peter';
const userNameSample = 'isaie';

describe('Following a user', () => {
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
        tokenGen1 = body.user.token;
        done();
      });
  });

  it('should be able to follow each other', (done) => {
    chai.request(app)
      .post(`/api/${userName2}/follow`)
      .set('Authorization', `Bearer ${tokenGen1}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('message');
        expect(body.message).to.equals('you are following peter');
        done();
      });
  });
  it('Should return followers', (done) => {
    chai
      .request(app)
      .get('/api/following')
      .set('Authorization', `Bearer ${tokenGen1}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('message');
        expect(body.message).to.equals('Following');
        done();
      });
  });
  it('should not be able to follow unexisting users', (done) => {
    chai.request(app)
      .post(`/api/${userNameSample}/follow`)
      .set('Authorization', `Bearer ${tokenGen1}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('error');
        expect(body.error).to.equals('User does not exists!');
        done();
      });
  });

  it('should not be able to follow themselves', (done) => {
    chai.request(app)
      .post(`/api/${userName1}/follow`)
      .set('Authorization', `Bearer ${tokenGen1}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('error');
        expect(body.error).to.equals('You can not follow yourself');
        done();
      });
  });
  it('User should not follow another user if token is missing', (done) => {
    chai
      .request(app)
      .post(`/api/${userName2}/follow`)
      .set('Authorization', '')
      .end((err, res) => {
        const { body } = res;
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('error');
        expect(body.error).to.equals('unauthorised to use this resource, please signup/login');
        done();
      });
  });
  it('User should be able to unfollow user', (done) => {
    chai.request(app)
      .post(`/api/${userName2}/follow`)
      .set('Authorization', `Bearer ${tokenGen1}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('message');
        expect(body.message).to.equals('you unfollowed peter');
        done();
      });
  });
  it('Should not return followers, if you do not have followers', (done) => {
    chai
      .request(app)
      .get('/api/followers')
      .set('Authorization', `Bearer ${tokenGen1}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('error');
        expect(body.error).to.equals("You don't have followers");
        done();
      });
  });
  it('Should not return following users, if they are no followers', (done) => {
    chai
      .request(app)
      .get('/api/following')
      .set('Authorization', `Bearer ${tokenGen1}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('error');
        expect(body.error).to.equals("You aren't following anyone");
        done();
      });
  });
  it('should be able to sign in', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(user.userTrue)
      .end((req, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('message');
        expect(body).to.have.property('user');
        expect(body.message).to.equals('logged in');
        tokenGen2 = body.user.token;
        done();
      });
  });
  it('should be able to follow each other', (done) => {
    chai.request(app)
      .post(`/api/${userName1}/follow`)
      .set('Authorization', `Bearer ${tokenGen2}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('message');
        done();
      });
  });
  it('Should return followers', (done) => {
    chai
      .request(app)
      .get('/api/followers')
      .set('Authorization', `Bearer ${tokenGen1}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(body).to.have.property('message');
        expect(body.message).to.equals('Followers');
        done();
      });
  });
});
