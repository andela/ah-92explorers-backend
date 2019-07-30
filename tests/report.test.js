import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import dummyData from './index.test';

// editing test in morning

chai.use(chaiHttp);

const { expect } = chai;
let adminToken;
let userToken;

const report = {
  message: 'This article has violate the rules and regulation of Authors Haven',
  type: 'Violation',
};

const slugArticle = 'the-basics-of-java2';

describe('Testing report an article ', () => {
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
        adminToken = body.user.token;
        done();
      });
  });

  it('should login user', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(dummyData.userTrue)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(body).to.have.property('message');
        expect(body).to.have.property('user');
        expect(body.user).to.have.property('email');
        expect(body.user).to.have.property('username');
        expect(body.message).to.equals('logged in');
        userToken = body.user.token;
        done();
      });
  });

  // CREATE A REPORT
  it('Should let user to report an article with valid details', (done) => {
    chai.request(app)
      .post(`/api/report/articles/${slugArticle}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send(report)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(201);
        expect(body).to.have.property('message');
        expect(body).to.have.property('report');
        expect(body.message).to.have.equals('successfully reported article');
        done();
      });
  });

  it('Should not allow user to report an article more than one', (done) => {
    chai.request(app)
      .post(`/api/report/articles/${slugArticle}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send(report)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(body).to.have.property('message');
        expect(body.message).to.have.equals('You have already reported this article');
        done();
      });
  });

  it('Should not allow user to report an article with invalid authorization', (done) => {
    chai.request(app)
      .post(`/api/report/articles/${slugArticle}`)
      .send(report)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(401);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('unauthorised to use this resource, please signup/login');
        done();
      });
  });

  it('Should not allow user to report with invalid article slug', (done) => {
    chai.request(app)
      .post(`/api/report/articles/${slugArticle}32`)
      .set('Authorization', `Bearer ${userToken}`)
      .send(report)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(404);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('The article you\'re trying to report is not found');
        done();
      });
  });

  // GET REPORT
  // admin get all reports
  it('Should allow admin only to get reported articles ', (done) => {
    chai.request(app)
      .get('/api/reports/articles')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(body).to.have.property('message');
        expect(body).to.have.property('reports');
        expect(body.message).to.have.equals('successfully reported article');
        done();
      });
  });

  it('Should not allow any user to  get report with data', (done) => {
    chai.request(app)
      .get('/api/reports/articles')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(401);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('Unauthorized to make this request');
        done();
      });
  });

  it('Should not allow admin to get report  of an article with invalid authorization', (done) => {
    chai.request(app)
      .get('/api/reports/articles')
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(401);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('unauthorised to use this resource, please signup/login');
        done();
      });
  });


  // user get his/her own report
  it('Should not allow user to get his/her report  of an article with invalid authorization', (done) => {
    chai.request(app)
      .get('/api/report/articles')
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(401);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('unauthorised to use this resource, please signup/login');
        done();
      });
  });

  it('Should allow user to get his/her own reported articles ', (done) => {
    chai.request(app)
      .get('/api/report/articles')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(body).to.have.property('message');
        expect(body).to.have.property('reports');
        expect(body.message).to.have.equals('successfully reported article');
        done();
      });
  });

  // DELELTE article test
  it('Should not allow user to delete an article with invalid authorization', (done) => {
    chai.request(app)
      .delete(`/api/reports/article/${slugArticle}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(401);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('unauthorised to use this resource, please signup/login');
        done();
      });
  });

  it('Should not allow any user to delete reported article', (done) => {
    chai.request(app)
      .delete(`/api/reports/article/${slugArticle}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(401);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('Unauthorized to make this request');
        done();
      });
  });

  it('Should not allow admin to delete reported article with invalid article slug', (done) => {
    chai.request(app)
      .delete(`/api/reports/article/${slugArticle}32`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(404);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('This article is not found');
        done();
      });
  });

  it('Should allow admin to delete a reported article with data', (done) => {
    chai.request(app)
      .delete(`/api/reports/article/${slugArticle}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(body).to.have.property('message');
        expect(body.message).to.have.equals('successfully deleted a report');
        done();
      });
  });

  it('Should not allow admin to delete again a reported article with data', (done) => {
    chai.request(app)
      .delete(`/api/reports/article/${slugArticle}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(404);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('This article is not found');
        done();
      });
  });

  it('Should not allow user to get report if he/she didn\'t report', (done) => {
    chai.request(app)
      .get('/api/report/articles')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        const { status, body } = res;
        expect(status).to.equal(404);
        expect(body).to.have.property('error');
        expect(body.error).to.have.equals('No reported article');
        done();
      });
  });
});
