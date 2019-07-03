import http from 'http';
import { assert } from 'chai';

describe('Express Server', () => {
  it('should return 200', (done) => {
    http.get('http://localhost:3000/api/welcome', (res) => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
