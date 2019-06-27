import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import dummyData from './index.test';

chai.use(chaiHttp);

const { expect } = chai;
const data = [];

describe('Testing if user can rate and see a rating of articles', () => {
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
        data.push(body.user.token);
        done();
      });
  });

  it('should rate an article given valid auth', (done) => {
    chai.request(app)
      .post('/api/article/the-basics-of-javaa/rate')
      .set('Authorization', `Bearer ${data[0]}`)
      .send(dummyData.rating)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(201);
        expect(body).to.have.property('message');
        expect(body).to.have.property('rating');
        expect(body.rating).to.have.property('author');
        expect(body.rating).to.have.property('title');
        expect(body.rating).to.have.property('body');
        expect(body.message).to.have.equals('you have successfully rated this article');
        done();
      });
  });

  it('should not allow a user rate an article with a string', (done) => {
    chai.request(app)
      .post('/api/article/the-basics-of-javaa/rate')
      .set('Authorization', `Bearer ${data[0]}`)
      .send(dummyData.ratingFalse)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('rating should be a number');
        done();
      });
  });

  it('should not allow an article have a rating below zero and greater than 5', (done) => {
    chai.request(app)
      .post('/api/article/the-basics-of-javaa/rate')
      .set('Authorization', `Bearer ${data[0]}`)
      .send(dummyData.ratingFalseNumber)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('rating should be between 1-5');
        done();
      });
  });

  it('should not allow a user rate an article with an invalid slug', (done) => {
    chai.request(app)
      .post('/api/article/the-basics-of-ja/rate')
      .set('Authorization', `Bearer ${data[0]}`)
      .send(dummyData.rating)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(404);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('failed to find an article to rate');
        done();
      });
  });
});
