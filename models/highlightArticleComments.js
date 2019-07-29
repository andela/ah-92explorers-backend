export default (sequelize, DataTypes) => {
  const highlightArticleComments = sequelize.define('highlightArticleComments', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    startIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stopIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    highlight: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    articleSlug: {
      type: DataTypes.STRING,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'articles',
        key: 'slug'
      }
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      default: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      default: true
    }
  },
  {});
  highlightArticleComments.associate = (models) => {
    highlightArticleComments.belongsTo(models.users, { as: 'author', foreignKey: 'authorId' });
    highlightArticleComments.belongsTo(models.articles, { foreignKey: 'articleSlug' });
  };
  return highlightArticleComments;
};
