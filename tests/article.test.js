import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import dummy from './index.test';

chai.use(chaiHttp);

let authToken;
let articleSlug;

describe('CRUD articles routes', () => {
  // @user login
  it('should send back a token after sucessful login', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(dummy.adminLogin)
      .then((res) => {
        res.should.have.status(200);
        authToken = res.body.user.token; // get the token
        done();
      })
      .catch(err => done(err));
  });

  // @create article
  it('should create an article', (done) => {
    chai.request(app)
      .post('/api/articles')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('title', dummy.article1.title)
      .field('body', dummy.article1.body)
      .field('tagList', dummy.article1.tagList)
      .attach('image', '')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('Object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Article created successfully');
        articleSlug = res.body.article.slug; // get the slug
        done();
      });
  });

  // @fail to create when the title is empty
  it('should not create an article if either the title or the body is null', (done) => {
    chai.request(app)
      .post('/api/articles')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('article', '')
      .field('body', dummy.article1.body)
      .field('tagList', dummy.article1.tagList)
      .attach('image', '')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('Object');
        res.body.should.have.property('errors');
        done();
      });
  });

  // @return validation error for not meeting the min characters for body or title requests
  it('should not create an article if either the title or the body do not meet minimum charachers required', (done) => {
    chai.request(app)
      .post('/api/articles')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('title', dummy.article2.title)
      .field('body', dummy.article2.body)
      .field('tagList', dummy.article1.tagList)
      .attach('image', '')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('Object');
        res.body.should.have.property('errors');
        done();
      });
  });

  // @get all created articles
  it('should get all articles ', (done) => {
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
  it('should get a single article ', (done) => {
    chai.request(app)
      .get(`/api/articles/${articleSlug}`)
      .set('Content-Type', 'application/json')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.have.property('article');
        done();
      });
  });
  // @when single article is not found
  it('should not get an article which is not found', (done) => {
    chai.request(app)
      .get('/api/articles/dswewjohdeo')
      .set('Content-Type', 'application/json')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(404);
        res.body.should.have.property('error');
        done();
      });
  });
  // @should update a specified article and return status of 200
  it('should update a specified article', (done) => {
    chai.request(app)
      .put(`/api/articles/${articleSlug}`)
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('title', dummy.article1.title)
      .field('body', dummy.article1.body)
      .field('tagList', dummy.article1.tagList)
      .attach('image', '')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Article updated successfully');
        done();
      });
  });

  // should return status code of 401
  it('should return 401 if the token is not provided', (done) => {
    chai.request(app)
      .put(`/api/articles/${articleSlug}`)
      .set('Content-Type', 'multipart/form-data')
      .field('title', dummy.article1.title)
      .field('body', dummy.article1.body)
      .field('tagList', dummy.article1.tagList)
      .attach('image', '')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });
  // should return status code of 401
  it('should return a 401 if the token in invalid', (done) => {
    chai.request(app)
      .put(`/api/articles/${articleSlug}`)
      .set('Authorization', 'Bearer zzzzzzz')
      .set('Content-Type', 'multipart/form-data')
      .field('title', dummy.article1.title)
      .field('body', dummy.article1.body)
      .field('tagList', dummy.article1.tagList)
      .attach('image', '')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });
  // @should return 404
  // @article not found
  it('should not update an article which has not been created', (done) => {
    chai.request(app)
      .put('/api/articles/5007')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('title', dummy.article1.title)
      .field('body', dummy.article1.body)
      .field('tagList', dummy.article1.tagList)
      .attach('image', '')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(404);
        res.body.should.have.property('error');
        done();
      });
  });

  // @fail update if the title updated is empty
  it('should not create an article if the title or body updated is empty', (done) => {
    chai.request(app)
      .put(`/api/articles/${articleSlug}`)
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('title', dummy.article2.title)
      .attach('image', '')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('Object');
        res.body.should.have.property('errors');
        done();
      });
  });

  // @fail update When the body is less than 20 characters
  it('should not create an article if the body doesn\'t have up to 20 characters', (done) => {
    chai.request(app)
      .put(`/api/articles/${articleSlug}`)
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('body', dummy.article2.body)
      .attach('image', '')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('Object');
        res.body.should.have.property('errors');
        done();
      });
  });

  // @delete article
  // @return status code of 204
  it('should delete an article and return a status code of 204', (done) => {
    chai.request(app)
      .delete(`/api/articles/${articleSlug}`)
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(204);
        done();
      });
  });
  // @delete article
  // return status code of 404
  it('should not delete an article which is not created', (done) => {
    chai.request(app)
      .delete('/api/articles/5000')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(404);
        res.body.should.have.property('error');
        done();
      });
  });
});

export default {
  authToken
};
