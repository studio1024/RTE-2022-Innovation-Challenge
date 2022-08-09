'use strict'
const md5 = require('md5')
const Service = require('egg').Service

class DoctorService extends Service {
  async login(body) {
    const { app, ctx } = this
    body.password = md5(md5(body.password) + app.config.password_salt)

    const user = await ctx.model.Time.Doctor.findOne({
      where: {
        tel: body.tel,
      },
    })

    if (!user) {
      return {
        success: false,
        msg: '该用户不存在！',
      }
    }

    if (user.password === body.password) {
      const token = app.jwt.sign(
        {
          userid: user.id,
          tel: user.tel,
        },
        app.config.jwt.secret,
        {
          expiresIn: 60 * 60 * 24 * 30,
        }
      )
      return {
        success: true,
        msg: token,
      }
    }
    return {
      success: false,
      msg: '密码错误！',
    }
  }

  async getCurUserInfo() {
    const { ctx } = this
    const { userid } = ctx.state.user
    try {
      const user = await ctx.model.Time.Doctor.findOne({
        where: {
          id: userid,
        },
        attributes: [
          'id',
          'avatar',
          'name',
          'tel',
          'sex',
          'birthday',
          'hospital',
          'department',
          'of_medical',
          'online_time',
          'satr',
          'room_id',
          'have_pat',
          'upt_act'
        ],
      })
      return user
    } catch (error) {
      return null
    }
  }
  getHandledValue = (num) => {
    return num < 10 ? '0' + num : num
  }
  getDate(timeStamp, startType) {
    const d = new Date(timeStamp)
    const year = d.getFullYear()
    const month = this.getHandledValue(d.getMonth() + 1)
    const date = this.getHandledValue(d.getDate())
    const hours = this.getHandledValue(d.getHours())
    const minutes = this.getHandledValue(d.getMinutes())
    const second = this.getHandledValue(d.getSeconds())
    let resStr = ''
    if (startType === 'dt')
      resStr =
        year +
        '-' +
        month +
        '-' +
        date +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        second
    else if (startType === 'd') resStr = year + '-' + month + '-' + date
    else if (startType === 't') resStr = hours + ':' + minutes + ':' + second
    return resStr
  }
  async changePsw(body) {
    const { app, ctx } = this
    const { userid } = ctx.state.user
    console.log(body);
    const { old_pass, pass } = body
    try {
      const user = await ctx.model.Time.Doctor.findOne({
        where: {
          id: userid,
        },
      })
      console.log(user);
      if (md5(md5(old_pass) + app.config.password_salt) !== user.password) {
        return {
          success: false,
          msg: '原密码错误！',
        }
      }
      // const time = new Date()
      const updateBody = {
        password: md5(md5(pass) + app.config.password_salt),
        updated_at: this.getDate(new Date(), 'dt'),
        upt_act: 'U',
      }
      const res = await ctx.model.Time.Doctor.update(updateBody, {
        where: {
          id: userid,
        },
      })
      return {
        success: true,
        msg: '修改成功！',
      }
    } catch (error) {
      return {
        success: false,
        msg: '密码修改失败！',
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

  async page(query) {
    const { app, ctx } = this
    const { limit, page } = query
    const Op = app.Sequelize.Op
    const where = {
      upt_act: {
        [Op.ne]: 'D',
      },
    }
    if (query.name) {
      where.name = {
        [Op.like]: `%${query.name}%`,
      }
    }
    if (query.tel) {
      where.tel = {
        [Op.like]: `%${query.tel}%`,
      }
    }
    if (query.department) {
      where.department = query.department
    }
    return await ctx.model.Time.Doctor.findAndCountAll({
      distinct: true, // 不加distinct，count和实际不符
      where,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      attributes: ['id', 'name', 'avatar','birthday','department','hospital','of_medical','online_time','satr','sex','tel','have_pat','room_id','upt_act'],
      order: [['created_at', 'desc']],
    })
  }

  //  注册接口
  async create(body) {
    const { app, ctx } = this
    body.upt_act = 'I'
    body.password = md5(md5(body.password) + app.config.password_salt)
    try {
      const res = await ctx.model.Time.Doctor.create(body)
      // console.log(await ctx.model.Time.Doctor.create(body))
      // console.log(res)
      if (res) {
        // body.password = md5(md5(body.password) + app.config.password_salt)

        const user = await ctx.model.Time.Doctor.findOne({
          where: {
            tel: body.tel,
          },
        })

        if (user.password === body.password) {
          const token = app.jwt.sign(
            {
              userid: user.id,
              tel: user.tel,
            },
            app.config.jwt.secret,
            {
              expiresIn: 60 * 60 * 24 * 30,
            }
          )
          return {
            success: true,
            msg: token,
          }
        }
      } else {
        return { success: false, msg: '注册失败！' }
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
      }
    }
  }

  async update(body) {
    const { ctx } = this
    delete body.password
    body.updated_at = this.getDate(new Date(), 'dt')
    // body.upt_act = 'U'
    try {
      await ctx.model.Time.Doctor.update(body, {
        where: {
          id: body.id,
        },
      })
      return { success: true, msg: '修改成功' }
    } catch (error) {
      return null
    }
  }

  async delete(body) {
    const { ctx } = this
    body.upt_act = 'D'
    body.updated_at = this.getDate(new Date(), 'dt')
    // console.log(body);
    // 逻辑删除用户信息
    try {
      await ctx.model.Time.Doctor.update(body, {
        where: {
          id: body.id,
        },
      })
      return { success: true, msg: '删除成功' }
    } catch (error) {
      return null
    }
  }
}

module.exports = DoctorService
