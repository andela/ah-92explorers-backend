import SequelizeSlugify from 'sequelize-slugify';

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
    description: { type: DataTypes.STRING },
    body: { type: DataTypes.TEXT },
    taglist: { type: DataTypes.ARRAY(DataTypes.STRING) },
    author: {
      type: DataTypes.INTEGER, references: { model: 'user', key: 'id' }
    },
    image: { type: DataTypes.STRING, allowNull: true },
  }, {});
  articles.associate = (models) => {
    articles.belongsTo(models.users, { as: 'authorfkey', foreignKey: 'author', onDelete: 'CASCADE' });
  };
  SequelizeSlugify.slugifyModel(articles, {
    source: ['title'],
    slugOptions: { lower: true },
    overwrite: true,
    column: 'slug'
  });
  return articles;
};

export default articleModel;
