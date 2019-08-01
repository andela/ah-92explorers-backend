export default (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },

    message: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  notifications.associate = (models) => {
    notifications.belongsTo(models.users, {
      as: 'author',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return notifications;
};
