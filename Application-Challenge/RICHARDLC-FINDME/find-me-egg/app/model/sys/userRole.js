'use strict'

module.exports = app => {
    const { INTEGER } = app.Sequelize

    const SysUserRole = app.model.define('sys_user_role', {
        user_id: INTEGER(11),
        role_id: INTEGER(11)
    }, {
        sequelize: app.Sequelize,
        tableName: 'sys_user_role',
        timestamps: false, // 关闭时间自动化
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [
                    { name: 'user_id' },
                    { name: 'role_id' }
                ]
            }
        ]
    })

    return SysUserRole
}
