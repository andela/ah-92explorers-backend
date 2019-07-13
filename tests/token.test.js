import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testing if token middleware works', () => {
  it('should not allow user access a jwt protected route', (done) => {
    chai.request(app)
      .post('/api/users/signout')
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(401);
        expect(body).to.have.property('error');
        expect(body.error).to.equals('unauthorised to use this resource, please signup/login');
        done();
      });
  });

  it('should not allow user access a jwt protected route with an invalid token', (done) => {
    chai.request(app)
      .post('/api/users/signout')
      .set('Authorization', 'Bearer aiiamam')
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(401);
        expect(body).to.have.property('error');
        expect(body.error).to.equals('unauthorised to use this resource, please signup/login');
        done();
      });
  });
});
