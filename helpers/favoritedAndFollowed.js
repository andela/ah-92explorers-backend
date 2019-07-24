import models from '../models';

const {
  comments, users, likes, Follow
} = models;


export const favoritedArticle = async (id, slug) => {
  try {
    const allComments = await comments.findAll({
      where: { articleId: id },
      include: [
        {
          model: users,
          as: 'commentor',
          attributes: ['id',
            'username', 'email', 'notificationsOpt']
        }
      ]
    });
    const allLikes = await likes.findAll({
      where: { articleSlug: slug },
      include: [
        { model: users, as: 'liker', attributes: ['id', 'username', 'email', 'notificationsOpt'] }
      ]
    });
    return [[...allLikes], [...allComments]];
  } catch (error) {
    return error.message;
  }
};


export const followers = async (id) => {
  try {
    const allFollowers = await Follow.findAll({
      attributes: [],
      where: { followed: id },
      include: [{ model: users, as: 'follower', attributes: ['id', 'email', 'username', 'image', 'notificationsOpt'] }]
    });
    return allFollowers;
  } catch (error) {
    return error.message;
  }
};
