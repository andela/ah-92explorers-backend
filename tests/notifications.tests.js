import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import user from './index.test';
import model from '../models';
import {
  notificationForFavorite,
  notificationForFollower,
  sendNotificationToFollower,
} from '../controllers/notifications';

chai.use(chaiHttp);
const {
  users, notifications, articles
} = model;
const { expect } = chai;

let userId;
let idArticle;
let token;
let token2;
let authorID;
let articleSlug;
let notifier;

describe('Notification', () => {
  before(async () => {
    try {
      const loginUser = await chai.request(app).post('/api/users/login').set('Content-Type', 'application/json').send(user.adminLogin);
      const loginUser2 = await chai.request(app).post('/api/users/login').set('Content-Type', 'application/json').send({ email: 'elemanhillary@gmail.com', password: 'Password12$' });
      token = `Bearer ${loginUser.body.user.token}`;
      token2 = `Bearer ${loginUser2.body.user.token}`;
      userId = loginUser2.body.user.id;

      const postArticle = await chai.request(app).post('/api/articles').set('Authorization', token).send(user.givenArticle);
      const article = await articles.findOne({
        where: { slug: postArticle.body.article.slug }
      });
      idArticle = article.id;
      authorID = article.authorId;
      articleSlug = postArticle.body.article.slug;
      await chai.request(app).post(`/api/articles/${articleSlug}/comments`).set('Authorization', token).send(user.givenComment1);
      const postComment = await chai.request(app).post(`/api/articles/${articleSlug}/comments`).set('Authorization', token).send(user.givenComment2);
      notifier = postComment.body.comment.author.id;
      await chai.request(app).post('/api/akramTinny/follow').set('Authorization', token2);
      await chai.request(app).post('/api/articles').set('Authorization', token).send(user.givenArticle);
      await chai.request(app).post(`/api/favorite/${articleSlug}`).set('Authorization', token2);
      await users.update(
        { allowNotifications: false },
        { where: { email: 'elemanhillary@gmail.com' } }
      );
    } catch (error) {
      throw error;
    }
  });

  it('should create favorites notifications', (done) => {
    notificationForFavorite(idArticle, 'article updated', authorID, articleSlug)
      .then((data) => {
        expect(Object.prototype.toString.call(data)).to.be.equal('[object Array]');
        done();
      }).catch((error) => {
        done(error);
      });
  });

  it('should create followers notifications', (done) => {
    notificationForFollower(authorID, 'created article')
      .then((data) => {
        expect(Object.prototype.toString.call(data)).to.be.equal('[object Array]');
        done();
      }).catch((error) => {
        done(error);
      });
  });

  it('should send followers notifications', (done) => {
    sendNotificationToFollower(idArticle, 'created update', notifier);
    done();
  });

  it('should get all notifications', (done) => {
    chai.request(app)
      .get('/api/notifications')
      .set('Authorization', token)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('allNotification');
        done();
      });
  });

  it('should get one notification', (done) => {
    notifications.findOne({ where: { userId } })
      .then((notif) => {
        chai.request(app)
          .get(`/api/notifications/${notif.id}`)
          .set('Content-Type', 'application/json')
          .set('Authorization', token)
          .end((error, res) => {
            if (error) {
              done(error);
            }
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('notification');
            done();
          });
      });
  });

  it('should not get one notification if the id does not exist', (done) => {
    chai.request(app)
      .get('/api/notifications/e717038b-32ac-435a-977d-f4ce5706eb10')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').eql('notification not found');
        done();
      });
  });

  it('should 500 if the notification is not an UUID', (done) => {
    chai.request(app)
      .get('/api/notifications/good')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should not get one notification if the id does not exist', (done) => {
    chai.request(app)
      .delete('/api/notifications/e717038b-32ac-435a-977d-f4ce5706eb10')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').eql('notification not found');
        done();
      });
  });

  it('should 500 if the notification is not an UUID', (done) => {
    chai.request(app)
      .delete('/api/notifications/good')
      .set('Content-Type', 'application/json')
      .set('Authorization', token2)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should delete one notification', (done) => {
    notifications.findOne({ where: { userId } })
      .then((notification) => {
        chai.request(app)
          .delete(`/api/notifications/${notification.id}`)
          .set('Content-Type', 'application/json')
          .set('Authorization', token)
          .end((error, res) => {
            if (error) {
              done(error);
            }
            expect(res).to.have.status(204);
            done();
          });
      });
  });

  // subscription
  it('should unsubscribe user', (done) => {
    chai.request(app)
      .patch('/api/notifications/subscribe')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.be.equal('successfully unsubscribed to email notifications');
        done();
      });
  });

  it('should subscribe user', (done) => {
    chai.request(app)
      .patch('/api/notifications/subscribe')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.be.equal('successfully subscribed to email notifications');
        done();
      });
  });
});
