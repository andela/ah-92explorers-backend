export default (sequelize, DataTypes) => {
  const ratings = sequelize.define('ratings', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    articleSlug: {
      type: DataTypes.STRING,
      references: {
        model: 'articles',
        key: 'slug'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });
  ratings.removeAttribute('id');
  ratings.associate = (models) => {
    ratings.belongsTo(models.articles, { as: 'ratings', foreignKey: 'articleSlug', targetKey: 'slug' });
    ratings.belongsTo(models.users, { as: 'reviewer', foreignKey: 'userId' });
  };
  return ratings;
};
