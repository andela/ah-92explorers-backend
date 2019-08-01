import SequelizeSlugify from 'sequelize-slugify';

export default (sequelize, DataTypes) => {
  const articles = sequelize.define('articles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      required: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
    description: {
      type: DataTypes.STRING
    },
    body: {
      type: DataTypes.TEXT,
      required: true,
    },
    tagList: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    authorId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {});
  SequelizeSlugify.slugifyModel(articles, {
    source: ['title'], slugOptions: { lower: true }, overwrite: true, column: 'slug'
  });
  articles.associate = (models) => {
    articles.belongsTo(models.users, { as: 'author', foreignKey: 'authorId' });
    articles.hasMany(models.bookmark, { foreignKey: 'articleId' });
    articles.hasMany(models.ratings, { as: 'ratings', foreignKey: 'articleSlug', sourceKey: 'slug' });
    articles.hasMany(models.likes, { as: 'likes', foreignKey: 'articleSlug', sourceKey: 'slug' });
    articles.hasMany(models.comments, { as: 'comments', foreignKey: 'articleId', sourceKey: 'id' });
    articles.hasMany(models.articleStats, { foreignKey: 'articleSlug', sourceKey: 'slug' });
  };
  return articles;
};
