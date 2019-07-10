const articleModel = (Sequelize, DataTypes) => {
  const Article = Sequelize.define('article', {
    article_id: {
      type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
    title: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    body: { type: DataTypes.TEXT },
    author: {
      type: DataTypes.INTEGER, references: { model: 'user', key: 'id' }
    },
    image: { type: DataTypes.STRING, allowNull: true },
  }, {});
  Article.associate = (models) => {
    Article.belongsTo(models.user, { as: 'authorfkey', foreignKey: 'author', onDelete: 'CASCADE' });
  };
  return Article;
};

export default articleModel;
