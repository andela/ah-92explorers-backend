export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      provider: DataTypes.STRING
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
