'use strict'
const base = require('../base') // 引入模型公共基础配置

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize

    const SysRole = app.model.define('sys_role',
        Object.assign(base(app), {
            id: {
                autoIncrement: true,
                type: INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: '物理主键'
            },
            name: {
                type: STRING(25),
                allowNull: true,
                comment: '角色名称'
            },
            code: {
                type: STRING(25),
                allowNull: true,
                comment: '角色代码'
            },
            sort: {
                type: INTEGER,
                allowNull: true,
                comment: '排序'
            }
        }), {
            sequelize: app.Sequelize,
            tableName: 'sys_role',
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

    SysRole.associate = () => {
        SysRole.belongsToMany(app.model.Sys.User, {
            through: app.model.Sys.UserRole,
            foreignKey: 'role_id',
            otherKey: 'user_id'
        })
    }
    SysRole.associate = () => {
        SysRole.belongsToMany(app.model.Sys.Menu, {
            through: app.model.Sys.RoleMenu,
            foreignKey: 'role_id',
            otherKey: 'menu_id'
        })
    }
    return SysRole
}
