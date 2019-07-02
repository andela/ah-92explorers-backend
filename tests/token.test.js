import chai from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checkToken } from '../middlewares';

dotenv.config();
const { expect } = chai;

const dummyData = {
  username: 'elema',
  firstName: 'eleman',
  lastName: 'hillary',
  email: 'eleman@gmail.com',
};

describe('Test checkToken Middleware', () => {
  let request;
  let response;
  let next;

  beforeEach(() => {
    request = {};
    response = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    next = sinon.spy();
  });
  it('should `next` not be called if bad token was provided', () => {
    request.headers = {};
    request.headers.authorization = 'some authorization header';
    checkToken(request, response, next);
    expect(next.called).to.equal(false);
  });

  it('should `request` contain user info if good token was provided', () => {
    request.headers = {};
    request.headers.authorization = jwt.sign(dummyData, process.env.SECRET);
    checkToken(request, response, next);
    expect(request.decoded).to.have.property('email');
    expect(request.decoded.email).to.be.equal('eleman@gmail.com');
  });

  it('should `next` be called once if good token was provided', () => {
    request.headers = {};
    request.headers.authorization = jwt.sign(dummyData, process.env.SECRET);
    checkToken(request, response, next);
    expect(next.calledOnce).to.equal(true);
  });
});
