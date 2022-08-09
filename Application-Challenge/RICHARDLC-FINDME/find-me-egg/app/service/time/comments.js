'use strtic'
const Service = require('egg').Service

class CommentsService extends Service {
  async create(body) {
    const { ctx } = this
    try {
      await ctx.model.Time.Comments.create(body)
      return { success: true, msg: '新增成功' }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }

  async update(body) {
    const { ctx } = this
    try {
      console.log(body);
      const res = await ctx.model.Time.Comments.update(body, {
        where: {
          id: body.id,
        },
      })
      return { success: true, msg: '更新成功' }
    } catch (error) {
      return { success: false }
    }
  }

  async query(query) {
    const { app, ctx } = this
    const { limit, page } = query
    let where = {}
    if (query.see_id) {
      where.see_id = query.see_id
    }

    try {
      // console.log(1223)
      const res = await ctx.model.Time.Comments.findAndCountAll({
        distinct: true, // 不加distinct，count和实际不符
        where,
        include: [
          {
            model: this.ctx.model.Time.SeeDoctor,
            include: [
              { model: this.ctx.model.Time.Doctor, attributes: ['id', 'name']},
              {
                model: this.ctx.model.Time.Patient,
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
        // offset: (page - 1) * limit,
        // limit: parseInt(limit),
        // order: [['date', 'desc']],
      })
      return { success: true, msg: '查询成功', Data: res }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }

  // async delete(body){
  //     const { ctx } = this
  //     try {
  //         const res = await ctx.model.Time.Comments.delete({
  //             where: {
  //                 id:body.id
  //             }
  //         })
  //         return {success:true, msg:'删除成功'}
  //     } catch (error) {
  //         return {success:false}
  //     }
  // }
}

module.exports = CommentsService
