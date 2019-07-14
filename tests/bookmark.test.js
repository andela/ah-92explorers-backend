import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import user from './index.test';

chai.use(chaiHttp);
const { expect } = chai;

let tokenGen1;
const slugArticle = 'the-basics-of-java';

describe('Article bookmark', () => {
  it('signin a user for bookmark', (done) => {
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

  it('Should not bookmark the article', (done) => {
    chai.request(app)
      .post(`/api/articles/${slugArticle}/bookmark`)
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('Should successfully bookmark an article', (done) => {
    chai.request(app)
      .post(`/api/articles/${slugArticle}/bookmark`)
      .set('Content-Type', 'application/json')
      .set('Authorization', tokenGen1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Successfully bookmarked the article');
        expect(res.body).to.have.property('article');
        expect(res.body.article).to.have.property('title');
        done();
      });
  });
  it('Should allow the user to view all the article bookmarked', (done) => {
    chai.request(app)
      .get('/api/bookmark')
      .set('Authorization', tokenGen1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('Bookmarks').be.an('array');
        done();
      });
  });

  // Test of unfound bookmark

  it('Should not find the article to bookmark', (done) => {
    chai.request(app)
      .post('/api/articles/non-existing-article/bookmark')
      .set('Content-Type', 'application/json')
      .set('Authorization', tokenGen1)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Article is not found.');
        done();
      });
  });

  // Unbookmark the bookmarked article

  it('Should successfully unbookmark the article', (done) => {
    chai.request(app)
      .delete(`/api/articles/${slugArticle}/bookmark`)
      .set('Content-Type', 'application/json')
      .set('Authorization', tokenGen1)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
