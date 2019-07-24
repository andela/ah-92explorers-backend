import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import user from './index.test';

chai.use(chaiHttp);

const { expect } = chai;
const data = [];

describe('Testing if an admin can login', () => {
  it('should login an admin', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send({
        email: 'ackram@gmail.com',
        password: 'Alphamugerwa12$'
      })
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(body).to.have.property('message');
        expect(body).to.have.property('user');
        expect(body.user).to.have.property('email');
        expect(body.user).to.have.property('username');
        expect(body.message).to.equals('logged in');
        data.push(body.user.token);
        done();
      });
  });
});

describe('Testing creation of users', () => {
  it('should create users', (done) => {
    chai.request(app)
      .post('/api/admin/users')
      .set('Authorization', `Bearer ${data[0]}`)
      .send(user.userAdmin)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(201);
        expect(body).to.have.property('message');
        expect(body).to.have.property('user');
        expect(body.user).to.have.property('email');
        expect(body.user).to.have.property('username');
        expect(body.message).to.equals('user successfully created');
        done();
      });
  });

  it('should not create user with an email/username that already exist', (done) => {
    chai.request(app)
      .post('/api/admin/users')
      .set('Authorization', `Bearer ${data[0]}`)
      .send(user.userTrue)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(409);
        expect(body).to.have.property('error');
        expect(body.error).to.equals('This email or username is already registered');
        done();
      });
  });
});

describe('Testing if app returns all users', () => {
  it('should return all users on request', (done) => {
    chai.request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${data[0]}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(body).to.have.property('message');
        expect(body).to.have.property('users');
        expect(body.users[0]).to.have.property('email');
        expect(body.users[0]).to.have.property('username');
        expect(body.users[0]).to.have.property('id');
        expect(body.users[0]).to.have.property('createdAt');
        expect(body.users[0]).to.have.property('accessLevel');
        expect(body.message).to.equals('successfully returned all users in the database');
        data.push(body.users[0].id);
        done();
      });
  });
});

describe('Testing admin feature to update user accessLevel', () => {
  it('should update a user accessLevel', (done) => {
    chai.request(app)
      .patch(`/api/admin/users/${data[1]}`)
      .set('Authorization', `Bearer ${data[0]}`)
      .send(user.roleLevel)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);
        expect(body).to.have.property('message');
        expect(body).to.have.property('user');
        expect(body.user).to.have.property('email');
        expect(body.user).to.have.property('username');
        expect(body.user).to.have.property('accessLevel');
        expect(body.message).to.equals('successfully updated user accessLevel');
        done();
      });
  });

  it('should not update user accessLevel given a wrong userId/accessLevel', (done) => {
    chai.request(app)
      .patch('/api/admin/users/1')
      .set('Authorization', `Bearer ${data[0]}`)
      .send(user.fakeRoleLevel)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.equals('invalid accessLevel entry or userId');
        done();
      });
  });

  it('should not update user accessLevel given a wrong an accessLevel greater than tw0/less than 0', (done) => {
    chai.request(app)
      .patch(`/api/admin/users/${data[1]}`)
      .set('Authorization', `Bearer ${data[0]}`)
      .send(user.fakeRoleLevelInteger)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.equals('accessLevel should be lower than 2 and greater than 0');
        done();
      });
  });
});

describe('Testing admin feature to delete a user', () => {
  it('should delete a user given right id', (done) => {
    chai.request(app)
      .delete('/api/admin/users/c90dee64-663d-4d8b-b34d-12acba22cd33')
      .set('Authorization', `Bearer ${data[0]}`)
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(204);
        done();
      });
  });

  it('should not delete a user with a wrong userId', (done) => {
    chai.request(app)
      .delete('/api/admin/users/1')
      .set('Authorization', `Bearer ${data[0]}`)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(500);
        expect(body).to.have.property('error');
        expect(body.error).to.equals('failed to delete user');
        done();
      });
  });
});
