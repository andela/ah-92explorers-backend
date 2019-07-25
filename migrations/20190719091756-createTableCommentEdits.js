export const up = (queryInterface, Sequelize) => queryInterface.createTable('commentEdits', {
  commentId: {
    type: Sequelize.UUID,
    references: {
      model: 'comments',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  createdAt: {
    defaultValue: Sequelize.fn('now'),
    type: Sequelize.DATE,
    default: true
  },
  updatedAt: {
    defaultValue: Sequelize.fn('now'),
    type: Sequelize.DATE,
    default: true
  }
});

export const down = queryInterface => queryInterface.dropTable('commentEdits');
