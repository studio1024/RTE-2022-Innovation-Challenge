'use strict'
const base = require('../base') // 引入模型公共基础配置

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize

    const SysMenu = app.model.define('sys_menu',
        Object.assign(base(app), {
            id: {
                autoIncrement: true,
                type: INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: '物理主键'
            },
            path: {
                type: STRING(64),
                allowNull: true,
                comment: '路径'
            },
            component: {
                type: STRING(64),
                allowNull: true,
                comment: '组件路径'
            },
            name: {
                type: STRING(64),
                allowNull: true,
                comment: '组件标识'
            },
            meta_title: {
                type: STRING(32),
                allowNull: true,
                comment: '菜单标题'
            },
            meta_icon: {
                type: STRING(32),
                allowNull: true,
                comment: '菜单图标'
            },
            sort: {
                type: INTEGER,
                allowNull: true,
                comment: '排序'
            },
            parent_id: {
                type: INTEGER,
                allowNull: true,
                comment: '父菜单ID'
            },
            hidden: {
                type: STRING(2),
                allowNull: true,
                comment: '(0显示，1隐藏)'
            },
            keep_alive: {
                type: STRING(2),
                allowNull: true,
                defaultValue: () => '0',
                comment: '(0不缓存，1缓存)'
            }
        }), {
            sequelize: app.Sequelize,
            tableName: 'sys_menu',
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

    SysMenu.associate = () => {
        SysMenu.belongsToMany(app.model.Sys.Role, {
            through: app.model.Sys.RoleMenu,
            foreignKey: 'menu_id',
            otherKey: 'role_id'
        })
    }
    return SysMenu
}
