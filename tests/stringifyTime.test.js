import { assert } from 'chai';
import { stringifyTime, readTime } from '../helpers/readTime';

describe('Stringify time into human readable format', () => {
  it('should stringify time in a string', () => {
    const getMinutes = stringifyTime(2);
    const getAminute = stringifyTime(1);
    assert(getMinutes, '2 minutes');
    assert(getAminute, '1 minute');
  });
  it('article read time', () => {
    const timeCount = readTime('we are the ones');
    assert(timeCount.counts, 4);
    assert.notEqual(timeCount.time, 1);
  });
});
