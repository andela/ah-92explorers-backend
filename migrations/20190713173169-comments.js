export const up = (queryInterface, Sequelize) => queryInterface.createTable('comments', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  articleId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'articles', key: 'id'
    }
  },
  authorId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'users', key: 'id',
    }
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now')
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now')
  }
});

export const down = queryInterface => queryInterface.dropTable('comments');
