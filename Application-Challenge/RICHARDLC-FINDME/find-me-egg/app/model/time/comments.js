'use strict'

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const Comments = app.model.define('comments', {
    id: {
      autoIncrement: true,
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    see_id: {
      type: INTEGER,
      allowNull: false,
      comment: "就诊id",
      references: {
        model: 'see_doctor',
        key: 'id'
      }
    },
    content: {
      type: STRING(255),
      allowNull: true,
      comment: "内容"
    },
    images: {
      type: STRING(255),
      allowNull: true,
      comment: "图片地址"
    },
    date: {
      type: STRING(64),
      allowNull: true,
      comment: "评价日期"
    },
    star: {
      type: STRING(255),
      allowNull: true,
      comment: "星级"
    }
  }, {
    sequelize:app.Sequelize,
    tableName: 'comments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "see_id",
        using: "BTREE",
        fields: [
          { name: "see_id" },
        ]
      },
    ]
  });
  Comments.associate = () => {
    Comments.belongsTo(app.model.Time.SeeDoctor, { foreignKey: 'see_id' })
}
  return Comments
};
