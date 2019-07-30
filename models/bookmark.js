export default (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('bookmark', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    articleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    }
  }, {});
  Bookmark.associate = (models) => {
    Bookmark.belongsTo(models.users, {
      foreignKey: 'userId', targetKey: 'id', as: 'user'
    });
    Bookmark.belongsTo(models.articles, {
      foreignKey: 'articleId', targetKey: 'id', as: 'article'
    });
  };
  return Bookmark;
};
