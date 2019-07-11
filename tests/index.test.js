const userTrue = {
  username: 'love1234',
  email: 'love123@gmail.com',
  password: 'Alpha123$',
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
  emailVerification
};
