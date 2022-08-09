'use strict'
const base = require('../base')

module.exports  = app => {
  const { STRING, INTEGER } = app.Sequelize
  const Dist = app.model.define('dict', {
    id: {
      autoIncrement: true,
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    type: {
      type: STRING(64),
      allowNull: true,
      comment: "字典归属"
    },
    value: {
      type: STRING(255),
      allowNull: true,
      comment: "值"
    },
    label: {
      type: STRING(255),
      allowNull: true,
      comment: "标签"
    }
  }, {
    sequelize:app.Sequelize,
    tableName: 'dict',
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
    ]
  });
  return Dist
};
