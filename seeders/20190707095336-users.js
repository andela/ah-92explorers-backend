import uuid from 'uuidv4';
import auth from '../helpers/auth'

export const up = (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
  [
    {
      id: 'c90dee64-663d-4d8b-b34d-12acba22cd30',
      email: 'johnnie@gmail.com',
      username: 'jhonnie',
      password: auth.hashPassword('Password12$'),
      accessLevel: 2
    },
    {
      id: 'c90dee64-663d-4d8b-b34d-12acba22cd31',
      email: 'peter@gmail.com',
      username: 'peterJ',
      password: auth.hashPassword('Password12$'),
      accessLevel: 1
    },
    {
      id: 'c90dee64-663d-4d8b-b34d-12acba22cd32',
      email: 'ackram@gmail.com',
      username: 'akramTinny',
      password: auth.hashPassword('Alphamugerwa12$'),
      accessLevel: 2,
    }
  ],
  {}
)

export const down = (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {});
