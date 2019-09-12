const articleMigration = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('articles',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      tagList: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
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
      objectID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
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
    }),
  down: queryInterface => queryInterface.dropTable('articles')
};

export default articleMigration;
