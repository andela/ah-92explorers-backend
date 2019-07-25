export const up = (queryInterface, Sequelize) => queryInterface.createTable('commentLikes', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  commentId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  articleSlug: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'articles',
      key: 'slug'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: true
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

export const down = queryInterface => queryInterface.dropTable('commentLikes');
