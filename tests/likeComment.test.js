import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import dummyData from './index.test';

chai.use(chaiHttp);

const { expect } = chai;
const userToken = [];

describe('Tesing if user can like/unlike a comment', () => {
  it('should login an admin', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(dummyData.adminLogin)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(body).to.have.property('message');
        expect(body).to.have.property('user');
        expect(body.user).to.have.property('email');
        expect(body.user).to.have.property('username');
        expect(body.message).to.equals('logged in');
        userToken.push(body.user.token);
        done();
      });
  });

  it('should not allow a user to like a comment with invalid article id', (done) => {
    chai.request(app)
      .post('/api/article/comment/c90dee64-663d-4d8b-b34d-12acba22cd9x/like')
      .set('Authorization', `Bearer ${userToken[0]}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(500);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('Failed to like this comment, please try again');
        done();
      });
  });

  it('should not allow user to like without authorization', (done) => {
    chai
      .request(app)
      .post('/api/article/comment/c90dee64-663d-4d8b-b34d-12acba22cd99/like')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(401);
        expect(res.body.error).to.be.equal('unauthorised to use this resource, please signup/login');
        done();
      });
  });

  it('should allow a user to like a comment', (done) => {
    chai.request(app)
      .post('/api/article/comment/c90dee64-663d-4d8b-b34d-12acba22cd99/like')
      .set('Authorization', `Bearer ${userToken[0]}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(201);
        expect(body).to.have.property('message');
        expect(body.message).to.have.equals('you liked this comment');
        done();
      });
  });

  it('should allow a user to unlike a comment', (done) => {
    chai.request(app)
      .post('/api/article/comment/c90dee64-663d-4d8b-b34d-12acba22cd99/like')
      .set('Authorization', `Bearer ${userToken[0]}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(body).to.have.property('message');
        expect(body.message).to.have.equals('you unliked this comment');
        done();
      });
  });
});
