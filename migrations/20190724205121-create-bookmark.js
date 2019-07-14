export const up = (queryInterface, Sequelize) => queryInterface.createTable('bookmarks', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    refences: {
      model: 'users',
      key: 'id'
    }
  },
  articleId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'articles',
      key: 'id'
    }
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

export const down = queryInterface => queryInterface.dropTable('bookmarks');
