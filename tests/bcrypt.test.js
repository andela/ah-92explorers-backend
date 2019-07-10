import { expect } from 'chai';
import Auth from '../helpers/auth';

const password = '{[}]:?><,.12345';
describe('Bcrpyt Password Hashing', () => {
  let result;
  it('should return hashed password(typeof \'string\')', () => {
    result = Auth.hashPassword(password);
    expect(typeof result).to.be.equal('string');
  });
  it('should return true if password and hashed password match', () => {
    result = Auth.comparePassword(password, result);
    expect(result).to.be.equal(true);
  });
  it('should return false if password and hashed password doesnot match', () => {
    result = Auth.comparePassword('ejkkjeb', `${result}`);
    expect(result).to.be.equal(false);
  });
});
