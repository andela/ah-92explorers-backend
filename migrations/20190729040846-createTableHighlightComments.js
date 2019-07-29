export const up = (queryInterface, Sequelize) => queryInterface.createTable('highlightArticleComments', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  startIndex: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  stopIndex: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  highlight: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  articleSlug: {
    type: Sequelize.STRING,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'articles',
      key: 'slug'
    }
  },
  authorId: {
    type: Sequelize.UUID,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'id'
    }
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

export const down = queryInterface => queryInterface.dropTable('highlightArticleComments');
