import uuid from 'uuidv4';

export const up = (queryInterface, Sequelize) => queryInterface.bulkInsert(
  'articles',
  [
    {
      id: uuid(),
      title: 'The basics of java',
      slug: 'the-basics-of-java',
      body: 'JavaScript is a language which has many frameworks and libraries',
      tagList: '{nodejs, programming}',
      authorId: 'c90dee64-663d-4d8b-b34d-12acba22cd32',
      createdAt: '2019-07-17 06:32:44.631+02',
      updatedAt: '2019-07-17 06:32:44.631+02',
    },
    {
      id: uuid(),
      title: 'The basics of javaa',
      slug: 'the-basics-of-javaa',
      body: 'JavaScript is a language which has many frameworks and libraries',
      tagList: '{programming}',
      authorId: 'c90dee64-663d-4d8b-b34d-12acba22cd32',
      createdAt: '2019-07-17 06:32:44.631+02',
      updatedAt: '2019-07-17 06:32:44.631+02',
    },
  ],
  {}
);
 
const down = (queryInterface, Sequelize) => queryInterface.bulkDelete('articles', null, {});
