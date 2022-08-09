'use strict'
const base = require('../base')

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  
  const Patient = app.model.define('patient',Object.assign(base(app), {
    id: {
      autoIncrement: true,
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    avatar: {
      type: STRING(255),
      allowNull: true,
      comment: "患者头像"
    },
    name: {
      type: STRING(64),
      allowNull: false,
      comment: "患者名字"
    },
    tel: {
      type: STRING(64),
      allowNull: false,
      comment: "患者电话"
    },
    sex: {
      type: STRING(32),
      allowNull: true,
      comment: "患者性别"
    },
    password: {
      type: STRING(64),
      allowNull: false,
      comment: "患者的密码"
    },
    healthy_care: {
      type: STRING(64),
      allowNull: true,
      comment: "医保卡"
    },
    birthday: {
      type: STRING(64),
      allowNull: true,
      comment: "生日"
    },
    address: {
      type: STRING(255),
      allowNull: true,
      comment: "地址"
    }
  }), {
    sequelize:app.Sequelize,
    tableName: 'patient',
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
  return Patient
};
