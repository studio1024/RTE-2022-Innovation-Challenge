'use strict'

const Service = require('egg').Service

class SysMenuService extends Service {
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
  async queryTree() {
    const { app, ctx } = this
    const Op = app.Sequelize.Op
    try {
      const data = await ctx.model.Sys.Menu.findAll({
        where: {
          upt_act: { [Op.ne]: 'D' },
        },
        order: [['sort']],
      })
      const tree = this.toTree(data.map((item) => item.dataValues))
      return tree
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async create(body) {
    const { ctx } = this

    const { userid } = ctx.state.user
    body.created_id = userid
    body.updated_id = userid
    body.hidden = '0'
    body.sort = '9'
    try {
      return await ctx.model.Sys.Menu.create(body)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async update(body) {
    const { ctx } = this
    const { userid } = ctx.state.user
    body.updated_at = this.getDate(new Date(), 'dt')
    body.updated_id = userid
    body.upt_act = 'U'
    body.created_at = this.getDate(body.created_at , 'dt')
    // console.log(body);
    try {
      return await ctx.model.Sys.Menu.update(body, {
        where: {
          id: body.id,
        },
      })
    } catch (error) {
      // console.log(error)
      return null
    }
  }

  async delete({ id }) {
    const { ctx } = this
    const body = {
      upt_act: 'D',
      updated_at: this.getDate(new Date(), 'dt'),
      updated_id: ctx.state.user.userid,
    }
    try {
      await ctx.model.Sys.Menu.update(body, {
        where: { id },
      })
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }

  async setRoleMenu({ trees, role_id }) {
    const { ctx } = this
    const roleMenuArr = trees.map((item) => {
      return { menu_id: item, role_id }
    })

    try {
      return await ctx.model.transaction(async (t) => {
        await ctx.model.Sys.RoleMenu.destroy({
          where: { role_id },
          transaction: t,
        })

        const res = await ctx.model.Sys.RoleMenu.bulkCreate(roleMenuArr, {
          transaction: t,
        })

        return { success: res.length > 0 }
      })
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }

  async getRoleMenu({ role_id }) {
    const { app, ctx } = this
    const Op = app.Sequelize.Op
    try {
      return await ctx.model.Sys.Menu.findAll({
        include: {
          model: ctx.model.Sys.Role,
          attributes: ['id', 'name', 'code'],
          where: { id: role_id },
        },
        where: { parent_id: { [Op.ne]: '0' } },
      })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getCurUserMenu() {
    const { app, ctx } = this
    const Op = app.Sequelize.Op

    try {
      const data = await ctx.model.Sys.Menu.findAll({
        attributes: [
          'id',
          'path',
          'component',
          'name',
          'meta_title',
          'meta_icon',
          'sort',
          'parent_id',
          'hidden',
          'keep_alive',
        ],
        include: {
          model: ctx.model.Sys.Role,
          attributes: ['id', 'name', 'code'],
          where: {
            id: { [Op.or]: ctx.state.user.roles },
          },
        },
        where: { upt_act: { [Op.ne]: 'D' } },
        order: [['sort']],
      })
      return this.toTree(data.map((item) => item.dataValues))
    } catch (error) {
      console.log(error)
      return null
    }
  }

  toTree(data, parent_id) {
    parent_id = parent_id || 0
    const tree = []
    data.forEach((item) => {
      if (item.parent_id === parent_id) {
        item.children = this.toTree(data, item.id)
        tree.push(item)
      }
    })
    return tree
  }
}
module.exports = SysMenuService
