'use strict'

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize
  const SeeDoctor = app.model.define(
    'see_doctor',
    {
      id: {
        autoIncrement: true,
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: 'id',
      },
      pat_id: {
        type: STRING(64),
        allowNull: true,
        comment: '患者id',
      },
      doc_id: {
        type: STRING(64),
        allowNull: true,
        comment: '医生id',
      },
      room: {
        type: STRING(64),
        allowNull: true,
        comment: '房间号',
      },
      com: {
        type: STRING(64),
        allowNull: true,
        comment: '评价id',
      },
      result: {
        type: STRING(255),
        allowNull: true,
        comment: '就诊结果',
      },
      date: {
        type: STRING(64),
        allowNull: true,
        comment: '就诊日期',
      },
      advice: {
        type: STRING(255),
        allowNull: true,
        comment: '医生建议',
      },
    },
    {
      sequelize: app.Sequelize,
      tableName: 'see_doctor',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'pat_id' }, { name: 'doc_id' },{ name: 'com' }],
        },
      ],
    }
  )

  SeeDoctor.associate = () => {
    SeeDoctor.belongsTo(app.model.Time.Doctor, { foreignKey: 'doc_id' })
    SeeDoctor.belongsTo(app.model.Time.Patient, { foreignKey: 'pat_id' })
    SeeDoctor.belongsTo(app.model.Time.Comments, { foreignKey: 'com' })
  }
  return SeeDoctor
}
