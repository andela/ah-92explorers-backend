export default (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    'Follow', {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        followed: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
      }
    },
    {
      timestamps: true,
      tableName: 'Follow'
    }
  );
  Follow.associate = (models) => {
    Follow.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'follower',
      targetkey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Follow.belongsTo(models.users, {
      foreignKey: 'followed',
      as: 'following',
      targetkey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Follow;
};
