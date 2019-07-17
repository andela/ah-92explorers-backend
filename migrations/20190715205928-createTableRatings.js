export const up = (queryInterface, Sequelize) => queryInterface.createTable('ratings', {
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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

  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  createdAt: {
    type: Sequelize.DATE,
    default: true
  },

  updatedAt: {
    type: Sequelize.DATE,
    default: true
  }
});

export const down = (queryInterface, Sequelize) => queryInterface.dropTable('ratings');
