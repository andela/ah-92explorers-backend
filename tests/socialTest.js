import chaiHttp from 'chai-http';
import chai from 'chai';
import dotenv from 'dotenv';
import server from '../index';
import models from '../models';

//* global it */
//* global describe */

const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

describe('Social Login', () => {
  before('Before any test, Create A new user', async () => {
    await models.User.destroy({
      where: {
        email: 'niyoceles3@gmail.com'
      },
      truncate: false
    });
  });

  it('should allow to save user in the database from google ', (done) => {
    chai
      .request(server)
      .post('/api/auth/google')
      .send({
        email: 'celestin.niyonsaba@andela.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should allow to save user in the database from facebook ', (done) => {
    chai
      .request(server)
      .post('/api/auth/facebook')
      .send({
        email: 'celestin.niyonsaba@andela.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should allow to save user in the database from twitter ', (done) => {
    chai
      .request(server)
      .post('/api/auth/twitter')
      .send({
        email: 'celestin.niyonsaba@andela.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should allow user to log-in with google', (done) => {
    chai
      .request(server)
      .get('/api/auth/google')
      .send({
        email: 'niyoceles3@gmail.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
    done();
  });

  it('should allow user to log-in with facebook', (done) => {
    chai
      .request(server)
      .get('/api/auth/facebook')
      .send({
        email: 'niyoceles3@gmail.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
    done();
  });

  it('should allow user to log-in with twitter', (done) => {
    chai
      .request(server)
      .get('/api/auth/twitter')
      .send({
        username: 'NIYONSABACeles3'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
    done();
  });
});

describe('Social User signout', () => {
  it('should allow user to signout', (done) => {
    chai
      .request(server)
      .get('/api/auth/signout')
      .send({
        email: 'niyoceles3@gmail.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
