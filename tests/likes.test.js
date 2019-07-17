import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import dummyData from './index.test';

chai.use(chaiHttp);

const { expect } = chai;
const data = [];

describe('Testing if user can like and dislike', () => {
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

  it('should like an article', (done) => {
    chai.request(app)
      .post('/api/like/the-basics-of-java')
      .set('Authorization', `Bearer ${data[0]}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(201);
        expect(body).to.have.property('message');
        expect(body.message).to.equals('successfully liked article');
        done();
      });
  });

  it('should unlike an article that he/she has already liked', (done) => {
    chai.request(app)
      .post('/api/like/the-basics-of-java')
      .set('Authorization', `Bearer ${data[0]}`)
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(204);
        done();
      });
  });

  it('should dislike an article', (done) => {
    chai.request(app)
      .post('/api/dislike/the-basics-of-java')
      .set('Authorization', `Bearer ${data[0]}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(201);
        expect(body).to.have.property('message');
        expect(body.message).to.equals('successfully disliked article');
        done();
      });
  });

  it('should remove dislike on lastclick', (done) => {
    chai.request(app)
      .post('/api/dislike/the-basics-of-java')
      .set('Authorization', `Bearer ${data[0]}`)
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(204);
        done();
      });
  });
});
