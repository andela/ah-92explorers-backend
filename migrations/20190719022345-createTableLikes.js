export const up = (queryInterface, Sequelize) => queryInterface.createTable('likes', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  articleSlug: {
    type: Sequelize.STRING,
    references: {
      model: 'articles',
      key: 'slug'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false
  },
  typeState: {
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

export const down = queryInterface => queryInterface.dropTable('likes');
