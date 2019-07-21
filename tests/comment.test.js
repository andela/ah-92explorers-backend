import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import user from './index.test';

chai.use(chaiHttp);
const { expect } = chai;
const slugArticle = 'the-basics-of-java';
let authToken;
const invalidToken = 'ohgod';

describe('Comment on Article', () => {
  // @user login
  it('should send back a token after sucessful login', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(user.adminLogin)
      .end((err, res) => {
        res.should.have.status(200);
        authToken = res.body.user.token; // get the token
        done();
      });
  });
  it('should not allow user to comment without authorization token', (done) => {
    chai
      .request(app)
      .post(`/api/articles/${slugArticle}/comments`)
      .set('Content-Type', 'application/json')
      .send(user.comment)
      .end((err, res) => {
        expect(res.body.error).to.be.equal('unauthorised to use this resource, please signup/login');
        done();
      });
  });
  it('Should not allow user to comment on article with invalid token', (done) => {
    chai
      .request(app)
      .post(`/api/articles/${slugArticle}/comments`)
      .set('Authorization', invalidToken)
      .send(user.comment)
      .end((err, res) => {
        expect(res.statusCode).to.be.eq(401);
        expect(typeof res.body.error).to.be.equal('string');
        expect(res.body.error).to.be.equal('unauthorised to use this resource, please signup/login');
        done();
      });
  });
  it('Should not allow user to comment on article with a wrong slug', (done) => {
    chai
      .request(app)
      .post('/api/articles/you-me/comments')
      .set('Authorization', authToken)
      .send(user.comment)
      .end((err, res) => {
        expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(404);
        expect(res.body.error).to.be.equal('article or user not found');
        done();
      });
  });
  it('Should not let user comment on article with invalid details', (done) => {
    chai
      .request(app)
      .post('/api/articles/kldkf-dfknfkd/comments')
      .set('Authorization', authToken)
      .send(user.comment)
      .end((err, res) => {
        expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(404);
        done();
      });
  });
  it('Should not let user comment on article with invalid comment body', (done) => {
    chai
      .request(app)
      .post(`/api/articles/${slugArticle}/comments`)
      .set('Authorization', authToken)
      .send(user.login)
      .end((err, res) => {
        expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
  it('Should let user comment on article with valid details', (done) => {
    chai
      .request(app)
      .post(`/api/articles/${slugArticle}/comments`)
      .set('Authorization', authToken)
      .send(user.comment)
      .end((err, res) => {
        expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(201);
        expect(typeof res.body.comment.body).to.be.equal('string');
        expect(res.body.comment.body).to.be.equal('My dragon is finally flying');
        expect(typeof res.body.comment.author).to.be.equal('object');
        expect(res.body.comment.author).to.have.property('username');
        expect(res.body.comment).to.have.property('createdAt');
        expect(res.body.comment).to.have.property('updatedAt');
        done();
      });
  });
});
