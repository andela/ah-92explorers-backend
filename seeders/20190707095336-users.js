import uuid from 'uuidv4';
import auth from '../helpers/auth'

export const up = (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
  [
    {
      id: 'c90dee64-663d-4d8b-b34d-12acba22cd30',
      email: 'johnnie@gmail.com',
      username: 'jhonnie',
      password: auth.hashPassword('Password12$'),
      accessLevel: 2,
      bio: 'A software developer and author',
      image: 'https://lh6.googleusercontent.com/-sZOpms2mUso/AAAAAAAAAAI/AAAAAAAAAgY/qI2F0nXUaU8/photo.jpg',
      phone: '+078899000000',
      facebook: 'facebook.com/peter',
      twitter: 'twitter.com/peter',
      linkedIn: 'linkedin.com/peter',
      instagram: 'instagram.com/peter',
      firstName: 'Johnnie',
      lastName: 'Bilal',
      location: 'gisozi'
    },
    {
      id: 'c90dee64-663d-4d8b-b34d-12acba22cd31',
      email: 'peter@gmail.com',
      username: 'peterJ',
      password: auth.hashPassword('Password12$'),
      accessLevel: 1,
      bio: 'A software developer and author',
      image: 'https://lh6.googleusercontent.com/-sZOpms2mUso/AAAAAAAAAAI/AAAAAAAAAgY/qI2F0nXUaU8/photo.jpg',
      phone: '+078899000000',
      facebook: 'facebook.com/peter',
      twitter: 'twitter.com/peter',
      linkedIn: 'linkedin.com/peter',
      instagram: 'instagram.com/peter',
      firstName: 'Peter',
      lastName: 'Mayanja',
      location: 'gisozi'
    },
    {
      id: 'c90dee64-663d-4d8b-b34d-12acba22cd32',
      email: 'ackram@gmail.com',
      username: 'akramTinny',
      password: auth.hashPassword('Alphamugerwa12$'),
      accessLevel: 2,
      bio: 'A software developer and author',
      image: 'https://lh6.googleusercontent.com/-sZOpms2mUso/AAAAAAAAAAI/AAAAAAAAAgY/qI2F0nXUaU8/photo.jpg',
      phone: '+078899000002',
      facebook: 'facebook.com/peter',
      twitter: 'twitter.com/peter',
      linkedIn: 'linkedin.com/peter',
      instagram: 'instagram.com/peter',
      firstName: 'Blessed',
      lastName: 'Mally',
      location: 'gisozi'
    },
    {
      id: 'c90dee64-663d-4d8b-b34d-12acba22cd33',
      email: 'bilige@gmail.com',
      username: 'ambilige',
      password: auth.hashPassword('Alphamugerwa12$'),
      accessLevel: 2,
      bio: 'A software developer and author',
      image: 'https://lh6.googleusercontent.com/-sZOpms2mUso/AAAAAAAAAAI/AAAAAAAAAgY/qI2F0nXUaU8/photo.jpg',
      phone: '+078899000002',
      facebook: 'facebook.com/peter',
      twitter: 'twitter.com/peter',
      linkedIn: 'linkedin.com/peter',
      instagram: 'instagram.com/peter',
      firstName: 'Sally',
      lastName: 'Layla',
      location: 'gisozi'
    }
  ],
  {}
)
export const down = (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {});