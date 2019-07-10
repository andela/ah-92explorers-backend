import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import user from './index.test';

chai.use(chaiHttp);

const { expect } = chai;


describe('Validate user inputs on signup', () => {
  it('should return an error message if the input is incomplete', (done) => {
    chai.request(app)
      .post('/api/admin/users')
      .send(user.incompleteUser)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.equals('A valid email, username and password are required');
        done();
      });
  });

  it('should return an error message if the invalid password was provided', (done) => {
    chai.request(app)
      .post('/api/admin/users')
      .send(user.invalidPassword)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
        expect(body.error[0]).to.equals('a valid password should not be alphanumeric');
        expect(body.error[1]).to.equals('a valid password should be 8 characters long');
        done();
      });
  });

  it('should return an error message if the invalid email was provided', (done) => {
    chai.request(app)
      .post('/api/admin/users')
      .send(user.invalidEmail)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.equals('please enter a valid email address e.g martinez@yahoo.com');
        done();
      });
  });

  it('should return an error message if the invalid username was provided', (done) => {
    chai.request(app)
      .post('/api/admin/users')
      .send(user.invalidUsername)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
        expect(body.error[0]).to.equals('username should not have less than 3 characters');
        expect(body.error[2]).to.equals('username should not be numeric');
        done();
      });
  });
});
