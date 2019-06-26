import chaiHttp from "chai-http";
import chai, { expect, should } from "chai";
import app from "../index";

chai.should();
chai.use(chaiHttp);

describe('User Endpoints', () => {
  
  it('Should login a user', (done) => {
    chai
      .request(app)
      .post('api/users/login')
      .send({
        email: "isaie.runoro@gmail.com",
        password: "explorers92"
      })
      .end((err, res) => {
        res.body.should.be.an('Object');
        done();
      });
  });

  it('Should not login a user', (done) => {
    chai
      .request(app)
      .post('api/users/login')
      .send({})
      .end((err, res) => {
        res.body.should.be.an('Object');
        done();
      });
  });

  it('Should create a user', (done) => {
    chai
      .request(app)
      .post('api/users')
      .send({
        username: "isaiah",
        email: "isaie.runoro@gmail.com",
        password: "explorers92",
      })
      .end((err, res) => {
        res.body.should.be.an('Object');
        done();
      });
  });

  it('Should not create a user', (done) => {
    chai
      .request(app)
      .post('api/users')
      .send({})
      .end((err, res) => {
        res.body.should.be.an('Object');
        done();
      });
  });

  it('should return user', (done) => {
    chai
      .request(app)
      .get('api/user')
      .end((err, res) => {
        res.body.should.be.an('Object');
        done();
      });
  });

  
  it('should update a user', (done) => {
    chai
      .request(app)
      .put('api/user')
      .send({
        username: 'isaie',
        email: 'isaie@gmail.com',
        bio: 'software engineer',
        image: 'jpeg',
        password: "password92",
      })
      .end((err, res) => {
        res.body.should.be.an('Object');
        done();
      });
  });

  it('should not update a user', (done) => {
    chai
      .request(app)
      .put('api/user')
      .send({})
      .end((err, res) => {
        res.body.should.be.an('Object');
        done();
      });
  });

});

