export default (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      required: true,
      validate: {
        isEmail: true
      }
    },
    provider: { type: DataTypes.STRING },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    accessLevel: {
      type: DataTypes.INTEGER,
      defaultValue: '0'
    },
    isVerified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  users.associate = (models) => {
    users.hasMany(models.articles, { foreignKey: 'authorId', allowNull: false });
    users.hasMany(models.comments, { foreignKey: 'authorId', allowNull: false });
  };
  return users;
};
