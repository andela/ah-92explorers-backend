export default (sequelize, DataTypes) => {
  const commentEdits = sequelize.define('commentEdits', {
    commentId: {
      type: DataTypes.UUID,
      references: {
        model: 'comments',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      default: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      default: true
    }
  }, {});
  commentEdits.removeAttribute('id');
  commentEdits.associate = (models) => {
    commentEdits.belongsTo(models.comments, { foreignKey: 'commentId', as: 'edits' });
  };
  return commentEdits;
};
