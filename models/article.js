const articleModel = (Sequelize, DataTypes) => {
  const articles = Sequelize.define('articles', {
    article_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: { type: DataTypes.STRING },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
    body: { type: DataTypes.TEXT },
    author: {
      type: DataTypes.INTEGER, references: { model: 'user', key: 'id' }
    },
    image: { type: DataTypes.STRING, allowNull: true },
  }, {});
  articles.associate = (models) => {
    articles.belongsTo(models.users, { as: 'authorfkey', foreignKey: 'author', onDelete: 'CASCADE' });
  };
  return articles;
};

export default articleModel;
