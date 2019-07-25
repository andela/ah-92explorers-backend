import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import dummy from './index.test';

chai.use(chaiHttp);

let authToken;
const slugArticle = 'the-basics-of-java';

describe('users can see reading stats', () => {
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
  // @record reading
  it('Should record user reading', (done) => {
    chai.request(app)
      .post(`/api/articles/${slugArticle}/record-reading`)
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.have.property('message');
        res.body.should.have.property('article');
        done();
      });
  });
  // @update the reading
  it('Should update the reading if a user read an article many times', (done) => {
    chai.request(app)
      .post(`/api/articles/${slugArticle}/record-reading`)
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.have.property('message');
        done();
      });
  });
  // @reading stats
  it('Should return user reading stats', (done) => {
    chai.request(app)
      .get('/api/users/reading-stats')
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('totalArticlesRead');
        res.body.should.have.property('articlesRead');
        done();
      });
  });
});
