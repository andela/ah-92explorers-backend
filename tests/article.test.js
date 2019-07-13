import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import user from './index.test';
import models from '../models';
import dummy from './dummy';

chai.use(chaiHttp);

const { users } = models;

let authToken;
let articleSlug;

describe('CRUD articles Routes', () => {
  before(() => {
    users.destroy({
      where: {
        email: user.userTrue.email
      }
    });
  });
  it('should signup user first with valid user crendentials', (done) => {
    chai.request(app)
      .post('/api/users')
      .send(user.userTrue)
      .then((res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        done();
      })
      .catch(err => done(err));
  });
  it('should login to get a token', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(user.login)
      .then((res) => {
        res.should.have.status(200);
        authToken = res.body.user.token; // get the token
        done();
      })
      .catch(err => done(err));
  });

  // @create article
  it('Should create article ', (done) => {
    // console.log(authToken);
    chai.request(app)
      .post('/api/articles')
      .set('Authorization', `Bearer ${authToken}`)
      .send(dummy.article1)
      .end((err, res) => {
        res.body.should.be.an('Object');
        articleSlug = res.body.article.slug; // get the slug
        done();
      });
  });

  it('Should have server errors ', (done) => {
    chai.request(app)
      .post('/api/articles')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('tag', dummy.article1.tag)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(500);
        done();
      });
  });
  // @get all created articles
  it('Should get all articles ', (done) => {
    chai.request(app)
      .get('/api/articles/feed')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.have.property('articles');
        done();
      });
  });
  // @get single articles
  it('Should get single article ', (done) => {
    chai.request(app)
      .get(`/api/articles/${articleSlug}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.have.property('article');
        done();
      });
  });
  // @when single article is not found
  it('Should not get single article when it is not found', (done) => {
    chai.request(app)
      .get('/api/articles/5000')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
  });
  // @should update a specified article and return status of 200
  it('Should update a specified article', (done) => {
    chai.request(app)
      .put(`/api/articles/${articleSlug}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(dummy.article1)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        done();
      });
  });

  // should return status code of 403
  it('Should return status code of 403 if the token is not provided', (done) => {
    chai.request(app)
      .put(`/api/articles/${articleSlug}`)
      .set('Authorization', '')
      .send(dummy.article1)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(403);
        res.body.should.have.property('error');
        done();
      });
  });
  // should return status code of 403
  it('Should return status  code of 403 if the token in invalid', (done) => {
    chai.request(app)
      .put(`/api/articles/${articleSlug}`)
      .set('Authorization', 'Bearer zzzzzzz')
      .send(dummy.article1)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  // @should return 404
  // @article not found
  it('Should not update an article which is not found', (done) => {
    chai.request(app)
      .put('/api/articles/5007')
      .set('Authorization', `Bearer ${authToken}`)
      .send(dummy.article1)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(404);
        done();
      });
  });
  // @delete article
  // @return status code of 200
  it('should delete an article return status code of 200 on deleting article', (done) => {
    chai.request(app)
      .delete(`/api/articles/${articleSlug}`)
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        done();
      });
  });
  // @delete article
  // return status code of 404
  it('should not delete an article which doesn\'t', (done) => {
    chai.request(app)
      .delete('/api/articles/5000')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(404);
        done();
      });
  });
});
