import dotenv from 'dotenv';

dotenv.config();
const userTrue = {
  email: 'peter@gmail.com',
  username: 'peter',
  password: 'Password12$',
};

const adminLogin = {
  email: 'ackram@gmail.com',
  username: 'akramTinny',
  password: 'Alphamugerwa12$',
};

const rating = {
  rating: 3
};

const ratingFalse = {
  rating: 'a'
};

const ratingFalseNumber = {
  rating: 7
};

const login = {
  email: 'peter@gmail.com',
  password: 'Password12$'
};

const userAdmin = {
  email: 'meiliss@gmail.com',
  username: 'pathhyss',
  password: 'Password12$'
};

const author = {
  email: 'danny123@gmail.com',
  password: 'Alphamugerwa12$'
};

const incompleteUser = {
  username: 'isaiah250',
  email: 'isaiah@gmail.com'
};

const invalidPassword = {
  username: 'isaiah250',
  email: 'isaiah@gmail.com',
  password: 'isaiah'
};

const invalidEmail = {
  username: 'isaiah250',
  email: 'isaiah.gmail.com',
  password: 'Isaiah@250'
};

const invalidUsername = {
  username: '23',
  email: 'isaiah.gmail.com',
  password: 'Isaiah@250'
};

const emailVerification = {
  firstName: 'isaie',
  lastName: 'runo',
  email: 'isaie@gmail.com',
  username: 'isaiah250',
  password: 'Explorers@92',
};

const profile = {
  email: 'ackram@gmail.com',
  username: 'akramTinny',
  bio: 'A software developer and author',
  image: 'https://lh6.googleusercontent.com/-sZOpms2mUso/AAAAAAAAAAI/AAAAAAAAAgY/qI2F0nXUaU8/photo.jpg',
  phone: '+078899000000',
  facebook: 'facebook.com/peter',
  twitter: 'twitter.com/peter',
  linkedIn: 'linkedin.com/peter',
  instagram: 'instagram.com/peter',
  location: 'gisozi',
  firstName: 'Eloin',
  lastName: 'Musk'
};

const userSignup = {
  username: 'isaiah250',
  email: 'isaiah@mail.com',
  password: 'Explorer@22'
};

const userLogin = {
  email: 'isaiah@mail.com',
  password: 'Explorer@22'
};

const invalidUpdate = {
  firstName: 'isaiah50',
  lastName: 'run23',
  phone: '0930209309'
};

const roleLevel = {
  accessLevel: 1
};

const fakeRoleLevel = {
  accessLevel: 'a'
};

const fakeRoleLevelInteger = {
  accessLevel: 5
};

const invalidDummy = {
  email: 'love123@gmail.com',
  password: 'Alpha13$',
};

const invalidDummy1 = {
  email: 'love23@gmail.com',
  password: 'Alpha123$',
};

const article1 = {
  title: 'The basics of nodejs',
  body: 'JavaScript is a language which has many frameworks and libraries',
  tagList: 'nodejs, programming'
};

const article2 = {
  title: 'The',
  body: 'JavaScript',
  tagList: 'nodejs, programming'
};

// twitter user
export const twitterUser = (req, res, next) => {
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
// google or facebook user
export const googleFacebookUser = (req, res, next) => {
  req.user = {
    id: req.body.id,
    displayName: 'Celestin Niyonsaba',
    name: { familyName: 'Niyonsaba', givenName: 'Celestin' },
    emails: [{ value: 'niyoceles3@gmail.com' }],
    photos: [
      {
        value:
          'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2158048164322418&height=50&width=50&ext=1565088705&hash=AeTmfNe52y04p7VS'
      }
    ],
    provider: 'google'
  };
  next();
};

const comment = {
  body: 'My dragon is finally flying'
};


export default {
  userTrue,
  roleLevel,
  fakeRoleLevel,
  fakeRoleLevelInteger,
  incompleteUser,
  invalidPassword,
  invalidEmail,
  invalidUsername,
  login,
  emailVerification,
  invalidDummy,
  invalidDummy1,
  article1,
  article2,
  userAdmin,
  adminLogin,
  comment,
  userSignup,
  userLogin,
  invalidUpdate,
  profile,
  rating,
  ratingFalse,
  ratingFalseNumber,
  author
};
