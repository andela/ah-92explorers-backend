export default (sequelize, DataTypes) => {
  const ratings = sequelize.define('ratings', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
    ratings.belongsTo(models.articles, { foreignKey: 'articleSlug' });
    ratings.belongsTo(models.users, { foreignKey: 'userId' });
  };
  return ratings;
};
