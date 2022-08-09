'use strict'
const md5 = require('md5')
const Service = require('egg').Service

class PatientService extends Service {
    async login(body) {
        const {
            app,
            ctx
        } = this
        body.password = md5(md5(body.password) + app.config.password_salt)

        const user = await ctx.model.Time.Patient.findOne({
            where: {
                tel: body.tel
            }
        })
        // console.log(user);

        if (!user) {
            return {
                success: false,
                msg: '该用户不存在！'
            }
        }

        if (user.password === body.password) {
            const token = app.jwt.sign({
                userid: user.id,
                tel: user.tel
            }, app.config.jwt.secret, {
                expiresIn: 60 * 60 * 24 * 30
            })
            return {
                success: true,
                msg: token
            }
        }
        return {
            success: false,
            msg: '密码错误！'
        }
    }

    // 获取用户信息
    async getCurUserInfo() {
        const {
            ctx
        } = this
        // console.log(ctx.state);
        const {
            userid
        } = ctx.state.user
        try {
            const user = await ctx.model.Time.Patient.findOne({
                where: {
                    id: userid
                },
                attributes: ['id', 'avatar', 'name', 'tel', 'sex', 'birthday', 'address']
            })
            return user
        } catch (error) {
            return null
        }
    }

    async changePsw(body) {
        const {
            app,
            ctx
        } = this
        const {
            userid
        } = ctx.state.user
        // console.log(body);
        const {
            old_pass,
            pass
        } = body
        try {
            const user = await ctx.model.Time.Patient.findOne({
                where: {
                    id: userid
                }
            })
            if (md5(md5(old_pass) + app.config.password_salt) !== user.password) {
                return {
                    success: false,
                    msg: '原密码错误！'
                }
            }
            const time = new Date()
            const updateBody = {
                password: md5(md5(pass) + app.config.password_salt),
                updated_at: time.toString(),
                upt_act: 'U'
            }
            const res = await ctx.model.Time.Patient.update(updateBody, {
                where: {
                    id: userid
                }
            })
            return {
                success: true,
                msg: '修改成功！'
            }
        } catch (error) {
            return {
                success: false,
                msg: '密码修改失败！'
            }
        }
    }

    // async resetPsw(body) {
    //     const {
    //         app,
    //         ctx
    //     } = this
    //     try {
    //         const user = await ctx.model.Mini.User.findOne({
    //             where: {
    //                 id: body.id
    //             }
    //         })
    //         await user.update({
    //             password: md5(md5(user.getDataValue('school_code') + '@123456') + app.config.password_salt),
    //             upt_act: 'U'
    //         })
    //         return {
    //             success: true,
    //             msg: '重置成功！'
    //         }
    //     } catch (error) {
    //         return {
    //             success: false,
    //             msg: '密码重置失败！'
    //         }
    //     }
    // }

    // async page(query) {
    //     const {
    //         app,
    //         ctx
    //     } = this
    //     const {
    //         limit,
    //         page
    //     } = query
    //     const Op = app.Sequelize.Op
    //     const where = {
    //         upt_act: {
    //             [Op.ne]: 'D'
    //         }
    //     }
    //     if (query.account) {
    //         where.account = {
    //             [Op.like]: `%${query.account}%`
    //         }
    //     }
    //     if (query.school_code) {
    //         where.school_code = query.school_code
    //     }
    //     if (query.group_code) {
    //         where.group_code = query.group_code
    //     }
    //     if (query.activity_id) {
    //         where.activity_id = query.activity_id
    //     }
    //     return await ctx.model.Mini.User.findAndCountAll({
    //         distinct: true, // 不加distinct，count和实际不符
    //         where,
    //         offset: (page - 1) * limit,
    //         limit: parseInt(limit),
    //         order: [
    //             ['created_at', 'desc']
    //         ]
    //     })
    // }

    //  注册接口
    async create(body) {
        const {
            app,
            ctx
        } = this

        body.password = md5(md5(body.password) + app.config.password_salt)

        try {
            const res = await ctx.model.Time.Patient.create(body)
            // console.log(res);
            if (res) {
                // body.password = md5(md5(body.password) + app.config.password_salt)

                const user = await ctx.model.Time.Patient.findOne({
                    where: {
                        tel: body.tel
                    }
                })

                if (user.password === body.password) {
                    const token = app.jwt.sign({
                        userid: user.id,
                        tel: user.tel
                    }, app.config.jwt.secret, {
                        expiresIn: 60 * 60 * 24 * 30
                    })
                    return {
                        success: true,
                        msg: token
                    }
                }
            } else {
                return { success: false, msg: '注册失败！' }
            }
        } catch (error) {
            return {
                success: false
            }
        }
    }

    async update(body) {
        const {
            ctx
        } = this
        delete body.password
        body.updated_at = (new Date()).toString()
        body.upt_act = 'U'
        try {
            await ctx.model.Time.Patient.update(body, {
                where: {
                    id: body.id
                }
            })
            return { success: true, msg: '修改成功' }
        } catch (error) {
            return null
        }
    }
    
    async delete(body) {
        const {
            ctx
        } = this
        body.upt_act = 'D'
        body.updated_at = (new Date()).toString()
        // console.log(body);
        // 逻辑删除用户信息
        try {
            await ctx.model.Time.Patient.update(body, {
                where: {
                    id: body.id
                }
            })
            return { success: true, msg: '删除成功' }
        } catch (error) {
            return null
        }
    }
    

}

module.exports = PatientService