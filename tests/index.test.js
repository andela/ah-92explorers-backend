const userTrue = {
  username: 'love1234',
  email: 'love123@gmail.com',
  password: 'Alpha123$'
};

const adminLogin = {
  email: 'ackram@gmail.com',
  username: 'jhonnie',
  password: 'Alphamugerwa12$',
};

const login = {
  email: 'love123@gmail.com',
  password: 'Alpha123$'
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
  adminLogin
};
