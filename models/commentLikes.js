export default (sequelize, DataTypes) => {
  const CommentLikes = sequelize.define(
    'commentLikes',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      commentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        references: {
          model: 'comments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      articleSlug: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'articles',
          key: 'slug'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      likes: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  CommentLikes.associate = (models) => {
    CommentLikes.belongsTo(models.comments, { foreignKey: 'commentId', as: 'comment' });
    CommentLikes.belongsTo(models.users, { foreignKey: 'userId', as: 'user' });
    models.users.belongsToMany(models.comments, {
      through: models.commentLikes,
      foreignKey: 'userId',
      otherKey: 'commentId'
    });
    models.comments.belongsToMany(models.users, {
      through: models.commentLikes,
      foreignKey: 'commentId',
      otherKey: 'userId'
    });
  };
  return CommentLikes;
};
