import chai from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checkToken } from '../middlewares/authToken';

dotenv.config();
const { expect } = chai;

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
  it('next should not be called if bad token was provided', () => {
    request.headers = {};
    request.headers.authorization = 'some authorization header';
    checkToken(request, response, next);
    expect(next.called).to.equal(false);
  });

  it('request should contain user info if good token was provided', () => {
    request.headers = {};
    request.headers.authorization = jwt.sign({ email: 'elemanhillary@gmail.com' }, process.env.secret);
    checkToken(request, response, next);
    expect(request.decoded).to.have.property('email');
    expect(request.decoded.email).to.be.equal('elemanhillary@gmail.com');
  });

  it('next should be called once if good token was provided', () => {
    request.headers = {};
    request.headers.authorization = jwt.sign({ email: 'elemanhillary@gmail.com' }, process.env.secret);
    checkToken(request, response, next);
    expect(next.calledOnce).to.equal(true);
  });
});
