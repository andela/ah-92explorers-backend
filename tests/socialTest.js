import chaiHttp from 'chai-http';
import chai from 'chai';
import dotenv from 'dotenv';
import server from '../index';

//* global it */
//* global describe */

const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

describe('Social Login', () => {
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
});
