import SequelizeSlugify from 'sequelize-slugify';

export default (sequelize, DataTypes) => {
  const articles = sequelize.define('articles', {
    id: {
      type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true,
    },
    title: { type: DataTypes.STRING, required: true, },
    slug: { type: DataTypes.STRING, unique: true, required: true, },
    description: { type: DataTypes.STRING },
    body: { type: DataTypes.TEXT, required: true, },
    tagList: { type: DataTypes.ARRAY(DataTypes.STRING) },
    authorId: { type: DataTypes.UUID, references: { model: 'user', key: 'id' } },
    image: { type: DataTypes.STRING, allowNull: true },
  }, {});
  articles.associate = (models) => {
    articles.belongsTo(models.users, { as: 'author', foreignKey: 'authorId', onDelete: 'CASCADE' });
    articles.hasMany(models.ratings, { foreignKey: 'articleSlug' });
  };
  SequelizeSlugify.slugifyModel(articles, {
    source: ['title'], slugOptions: { lower: true }, overwrite: true, column: 'slug'
  });
  return articles;
};
