const articleStatsModel = (sequelize, DataTypes) => {
  const ArticleStats = sequelize.define('articleStats', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
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
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'articles',
        key: 'slug'
      },
    },
    numberOfReading: { type: DataTypes.INTEGER }
  }, {});
  ArticleStats.associate = (models) => {
    ArticleStats.belongsTo(models.users, { foreignKey: 'userId', onDelete: 'CASCADE' });
    ArticleStats.belongsTo(models.articles, { foreignKey: 'articleSlug', onDelete: 'CASCADE', targetKey: 'slug' });
  };
  return ArticleStats;
};

export default articleStatsModel;
