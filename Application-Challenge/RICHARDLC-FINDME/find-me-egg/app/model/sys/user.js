'use strict'
const base = require('../base') // 引入模型公共基础配置

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize

    const SysUser = app.model.define('sys_user',
        Object.assign(base(app), {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            username: STRING(64),
            name: STRING(32),
            password: STRING(255),
            sex: STRING(2),
            phone: STRING(32)
        }), {
            sequelize: app.Sequelize,
            tableName: 'sys_user',
            timestamps: true,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'id' }
                    ]
                }
            ]
        })

    SysUser.associate = () => {
        SysUser.belongsToMany(app.model.Sys.Role, {
            through: app.model.Sys.UserRole,
            foreignKey: 'user_id',
            otherKey: 'role_id'
        })
    }

    return SysUser
}
