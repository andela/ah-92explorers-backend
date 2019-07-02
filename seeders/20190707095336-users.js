import uuid from 'uuidv4';

export const up = (queryInterface, Sequelize) => queryInterface.bulkInsert(
  'users',
  [
    {
      id: uuid(),
      email: 'johnnie@gmail.com',
      username: 'jhonnie',
      password: 'Password12$',
      accessLevel: 2
    },
    {
      id: uuid(),
      email: 'peter@gmail.com',
      username: 'peterJ',
      password: 'Password12$',
      accessLevel: 1
    }
  ],
  {}
);

const down = (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {});
