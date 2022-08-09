'use strict'
const base = require('../base')

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  const Doctor = app.model.define('doctor',Object.assign(base(app), {
    id: {
      autoIncrement: true,
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    name: {
      type: STRING(64),
      allowNull: false,
      comment: "医生姓名"
    },
    avatar: {
      type: STRING(255),
      allowNull: true,
      comment: "医生头像地址"
    },
    tel: {
      type: STRING(64),
      allowNull: true,
      comment: "医生电话"
    },
    password: {
      type: STRING(64),
      allowNull: false,
      comment: "医生密码"
    },
    sex: {
      type: STRING(64),
      allowNull: true,
      comment: "性别"
    },
    birthday: {
      type: STRING(64),
      allowNull: true,
      comment: "医生出生日期"
    },
    hospital: {
      type: STRING(64),
      allowNull: true,
      comment: "医生所在医院的代码"
    },
    of_medical: {
      type: STRING(255),
      allowNull: false,
      comment: "执医证明"
    },
    department: {
      type: STRING(255),
      allowNull: false,
      comment: "所在科室的字典值"
    },
    online_time: {
      type: STRING(64),
      allowNull: false,
      comment: "在线时间点"
    },
    satr: {
      type: STRING(64),
      allowNull: true,
      comment: "平均星级"
    },
    upt_act: {
      type: STRING(255),
      allowNull: true
    },
    created_id: {
      type: INTEGER,
      allowNull: true
    },
    created_at: {
      type: STRING(255),
      allowNull: true
    },
    room_id: {
      type: INTEGER,
      allowNull: true
    },
    updated_id: {
      type: INTEGER,
      allowNull: true
    },
    have_pat: {
      type: INTEGER,
      allowNull: true
    },
    updated_at: {
      type: STRING(255),
      allowNull: true
    }
  }), {
    sequelize:app.Sequelize,
    tableName: 'doctor',
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
  return Doctor
};
