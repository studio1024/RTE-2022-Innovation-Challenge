'use strict'

module.exports = app => {
    const { INTEGER } = app.Sequelize

    const SysRoleMenu = app.model.define('sys_role_menu', {
        role_id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: '角色ID'
        },
        menu_id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: '菜单ID'
        }
    }, {
        sequelize: app.Sequelize,
        tableName: 'sys_role_menu',
        timestamps: false, // 关闭时间自动化
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [
                    { name: 'role_id' },
                    { name: 'menu_id' }
                ]
            }
        ]
    })

    return SysRoleMenu
}
