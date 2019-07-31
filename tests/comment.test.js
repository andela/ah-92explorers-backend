import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import user from './index.test';

chai.use(chaiHttp);
const { expect } = chai;
const slugArticle = 'the-basics-of-java';
let authToken;
let authToken2;
const invalidToken = 'ohgod';

describe('Create, Get and Delete Comment', () => {
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
  it('should send back a token after sucessful login', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(user.secondLogin)
      .end((err, res) => {
        res.should.have.status(200);
        authToken2 = res.body.user.token; // get the token
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
      .set('Authorization', `Bearer ${invalidToken}`)
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
      .set('Authorization', `Bearer ${authToken}`)
      .send(user.comment)
      .end((err, res) => {
        // expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(404);
        expect(res.body.error).to.be.equal('article or user not found');
        done();
      });
  });
  it('Should not let user comment on article with invalid details', (done) => {
    chai
      .request(app)
      .post('/api/articles/kldkf-dfknfkd/comments')
      .set('Authorization', `Bearer ${authToken}`)
      .send(user.comment)
      .end((err, res) => {
        // expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(404);
        done();
      });
  });
  it('Should not let user comment on article with invalid comment body', (done) => {
    chai
      .request(app)
      .post(`/api/articles/${slugArticle}/comments`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(user.login)
      .end((err, res) => {
        expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
  it('Should let user comment on article with valid details', (done) => {
    chai
      .request(app)
      .post(`/api/articles/${slugArticle}/comments`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(user.comment)
      .end((err, res) => {
        // expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(201);
        // expect(typeof res.body.comment.body).to.be.equal('string');
        expect(res.body.comment.body).to.be.equal('My dragon is finally flying');
        // expect(typeof res.body.comment.author).to.be.equal('object');
        expect(res.body.comment.author).to.have.property('username');
        expect(res.body.comment).to.have.property('createdAt');
        expect(res.body.comment).to.have.property('updatedAt');
        done();
      });
  });
  it('should let a user get all comments on an article with a valid article slug', (done) => {
    chai
      .request(app)
      .get('/api/articles/the-basics-of-java/comments')
      .end((err, res) => {
        expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('article');
        expect(res.body.message).to.equals('successfully fetched comments of this article');
        expect(res.body.article).to.have.property('createdAt');
        expect(res.body.article).to.have.property('comments');
        expect(res.body.article.comments[0]).to.have.property('body');
        expect(res.body.article.comments[0]).to.have.property('commentor');
        done();
      });
  });
  it('should not let a user to get comments with an invalid slug', (done) => {
    chai
      .request(app)
      .get('/api/articles/the-basics-of-jav/comments')
      .end((err, res) => {
        expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals('failed to find article and comments');
        done();
      });
  });
  it('should not let a user delete a comment that he/she did not create', (done) => {
    chai
      .request(app)
      .delete('/api/comments/c90dee64-663d-4d8b-b34d-12acba22cd98')
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals('you are not allowed to delete this comment');
        done();
      });
  });
  it('should let a user delete a comment that he/she created', (done) => {
    chai
      .request(app)
      .delete('/api/comments/c90dee64-663d-4d8b-b34d-12acba22cd98')
      .set('Authorization', `Bearer ${authToken2}`)
      .end((err, res) => {
        expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(204);
        done();
      });
  });
  it('should not let a user delete a comment provided wrong id', (done) => {
    chai
      .request(app)
      .delete('/api/comments/c90dee64-663d-4d8b-b34d-12acba22cd98')
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(typeof res.statusCode).to.be.equal('number');
        expect(res.statusCode).to.be.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals('failed to find comment');
        done();
      });
  });
});
