module.exports = (sepuelize, Sequelize) => {
  const Post = sepuelize.define(
    "Post",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user: {
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
          as: "userId",
        },
      },
    },
    {
      tableName: "posts",
      timestamps: true,
    }
  );
  Post.associate = (models) => {
    Post.belongTo(models.user,  {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return Post;
};