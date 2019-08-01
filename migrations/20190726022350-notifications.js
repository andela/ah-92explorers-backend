export const up = (queryInterface, Sequelize) => queryInterface.createTable('notifications', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  message: {
    allowNull: false,
    type: Sequelize.STRING
  },
  status: {
    allowNull: false,
    type: Sequelize.STRING,
    defaultValue: 'unread'
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

export const down = queryInterface => queryInterface.dropTable('notifications');
