import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Search Functionality', () => {
  it('should return all articles with a specified title filter', (done) => {
    chai.request(app)
      .get('/api/articles?title=How to train your dragon')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(Object.prototype.toString.call(res.body.results)).to.be.equal('[object Array]');
        assert.notEqual(res.body.results.length, 0);
        expect(res.body.results[0]).to.have.property('title');
        expect(res.body.results[0].title).to.be.equal('How to train your dragon');
        done();
      });
  });
  it('should return all articles with a specified tag filter', (done) => {
    chai.request(app)
      .get('/api/articles?tag=life')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(Object.prototype.toString.call(res.body.results)).to.be.equal('[object Array]');
        assert.notEqual(res.body.results.length, 0);
        expect(res.body.results[0]).to.have.property('tagList');
        expect(res.body.results[0].tagList).to.include.members(['life']);
        done();
      });
  });
  it('should return all articles with a specified keyword filter', (done) => {
    chai.request(app)
      .get('/api/articles?keyword=how')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(Object.prototype.toString.call(res.body.results)).to.be.equal('[object Array]');
        assert.notEqual(res.body.results.length, 0);
        // expect(res.body.results[0].title).to.be.equal('i love you');
        done();
      });
  });
  it('should return 404 on empty search results', (done) => {
    chai.request(app)
      .get('/api/articles?keyword=ow')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).to.be.equal(404);
        done();
      });
  });
});
