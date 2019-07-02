export default (req, res, next) => {
  req.user = {
    id: req.body.id,
    username: 'NIYONSABACeles3',
    displayName: 'Celestin Niyonsaba',
    photos: [
      {
        value: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
      }
    ],
    provider: 'twitter'
  };
  next();
};
