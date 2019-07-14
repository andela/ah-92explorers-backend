import uuid from 'uuidv4';
import auth from '../helpers/auth';

export const up = (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
  [
    {
      id: uuid(),
      email: 'johnnie@gmail.com',
      username: 'jhonnie',
      password: auth.hashPassword('Alphamugerwa12$'),
      accessLevel: 2,
    },
    {
      id: uuid(),
      email: 'peter@gmail.com',
      username: 'peterJ',
      password: auth.hashPassword('Alphamugerwa12$'),
      accessLevel: 1,
    },
    {
      id: uuid(),
      email: 'ackram@gmail.com',
      username: 'akramTinny',
      password: auth.hashPassword('Alphamugerwa12$'),
      accessLevel: 2,
    }
  ],
  {}
)

export const down = (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {});
