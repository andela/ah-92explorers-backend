const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
  }, {});
  User.associate = (models) => {
    User.hasMany(models.article, { foreignKey: 'author', allowNull: false });
  };
  return User;
};

export default UserModel;
