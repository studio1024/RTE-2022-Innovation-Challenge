'use strict'
const moment = require('moment')

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize

    return {
        upt_act: { type: STRING(255), defaultValue: () => 'I', comment: '数据状态标识( I-插入;U-更新;D-删除 )' },
        created_id: { type: INTEGER, comment: '创建者id' },
        created_at: {
            type: STRING(255),
            comment: '创建时间',
            defaultValue: () => {
                return moment(Date.now())
                    .format('YYYY-MM-DD HH:mm:ss')
            },
            get() {
                return moment(this.getDataValue('created_at'))
                    .format('YYYY-MM-DD HH:mm:ss')
            }
        },
        updated_id: { type: INTEGER, comment: '更新者id' },
        updated_at: {
            type: STRING(255),
            comment: '更新时间',
            defaultValue: () => {
                return moment(Date.now())
                    .format('YYYY-MM-DD HH:mm:ss')
            },
            get() {
                return moment(this.getDataValue('updated_at'))
                    .format('YYYY-MM-DD HH:mm:ss')
            }
        }
    }
}
