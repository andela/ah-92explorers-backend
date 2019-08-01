const articleStatsMigration = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('articleStats', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
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
    numberOfReading: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('articleStats')
};

export default articleStatsMigration;
