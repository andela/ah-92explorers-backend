import uuid from 'uuidv4';

export const up = (queryInterface, Sequelize) => queryInterface.bulkInsert(
  'comments',
  [
    {
      id: 'c90dee64-663d-4d8b-b34d-12acba22cd98',
      articleId: 'c90dee64-663d-4d8b-b34d-12acba22cd57',
      body: 'JavaScript is a language which has',
      authorId: 'c90dee64-663d-4d8b-b34d-12acba22cd44'
    },
    {
        id: 'c90dee64-663d-4d8b-b34d-12acba22cd99',
        articleId: 'c90dee64-663d-4d8b-b34d-12acba22cd57',
        body: 'JavaScript is a language which has',
        authorId: 'c90dee64-663d-4d8b-b34d-12acba22cd44'
    }
  ],
  {}
);
 
const down = (queryInterface, Sequelize) => queryInterface.bulkDelete('comments', null, {});
