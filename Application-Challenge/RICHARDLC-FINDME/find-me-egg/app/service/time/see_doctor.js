'use strict'
const Service = require('egg').Service

class SeeDoctorService extends Service {
  //
  async page(query) {
    const { app, ctx } = this
    const { limit, page } = query
    let where = {}
    if (query.pat_id) {
      where.pat_id = query.pat_id
    }
    if (query.doc_id) {
      where.doc_id = query.doc_id
    }
    return await ctx.model.Time.SeeDoctor.findAndCountAll({
      distinct: true, // 不加distinct，coun
      where,
      include: [{ model: this.ctx.model.Time.Doctor, attributes: ['id','name'] },{ model: this.ctx.model.Time.Patient, attributes: ['id','name'] },{ model: this.ctx.model.Time.Comments}],
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [['date', 'desc']],
    })
  }

  async create(body) {
    const { app, ctx } = this

    try {
      const res = await ctx.model.Time.SeeDoctor.create(body)
      // console.log(res.dataValues.id);
      if (res) {
        return { success: true, msg: '创建成功！',see_id:res.dataValues.id }
      } else {
        return { success: false, msg: '注册失败！' }
      }
    } catch (error) {
        console.log(error);
      return {
        success: false,
      }
    }
  }

  async update(body) {
    const { ctx } = this
    try {
      const res = await ctx.model.Time.SeeDoctor.update(body, {
        where: {
          id: body.id,
        },
      })
      return { success: true, msg: '更新成功' }
    } catch (error) {
      return { success: false }
    }
  }

  async delete(body) {
    const { ctx } = this
    try {
      await ctx.model.Time.SeeDoctor.delete(body, {
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

module.exports = SeeDoctorService
