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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    provider: { type: DataTypes.STRING },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedIn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
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
    users.hasMany(models.articles, { as: 'author', foreignKey: 'authorId' });
    users.hasMany(models.ratings, { foreignKey: 'userId' });
    users.hasMany(models.likes, { as: 'liker', foreignKey: 'userId', sourceKey: 'id' });
    users.hasMany(models.articles, { foreignKey: 'authorId', allowNull: false });
    users.hasMany(models.comments, { foreignKey: 'authorId', allowNull: false });
    users.hasMany(models.Follow, { as: 'User', foreignKey: 'followed' });
    users.hasMany(models.bookmark, { foreignKey: 'userId', allowNull: false });
  };
  return users;
};
