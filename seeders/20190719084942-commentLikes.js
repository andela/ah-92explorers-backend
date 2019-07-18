import uuid from 'uuidv4';

export const up = (queryInterface, Sequelize) => queryInterface.bulkInsert(
  'commentLikes',
  [
    {
      id: uuid(),
      userId: 'c90dee64-663d-4d8b-b34d-12acba22cd32',
      commentId: '1e8150b6-d410-4eee-bccc-60809ff8d11d',
      articleSlug: 'the-basics-of-java',
      likes:1,
      createdAt: '2019-07-19 06:32:44.631+02',
      updatedAt: '2019-07-19 06:32:44.631+02',
    },
    {
      id: uuid(),
      userId: 'c90dee64-663d-4d8b-b34d-12acba22cd68',
      commentId: '1e8150b6-d410-4eee-bccc-60809ff8d11d',
      articleSlug: 'the-basics-of-java',
      likes:1,
      createdAt: '2019-07-19 06:32:44.631+02',
      updatedAt: '2019-07-19 06:32:44.631+02',
    },
  ],
  {}
);
 
const down = (queryInterface, Sequelize) => queryInterface.bulkDelete('commentLikes', null, {});