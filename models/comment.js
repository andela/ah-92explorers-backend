export default (Sequelize, DataTypes) => {
  const comments = Sequelize.define('comments', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: { model: 'articles', key: 'id' }
    },
    authorId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
  }, {});

  comments.associate = (models) => {
    comments.belongsTo(models.articles, { as: 'article', foreignKey: 'articleId', onDelete: 'CASCADE', });
    comments.belongsTo(models.users, { as: 'author', foreignKey: 'authorId', onDelete: 'CASCADE', });
  };
  return comments;
};
