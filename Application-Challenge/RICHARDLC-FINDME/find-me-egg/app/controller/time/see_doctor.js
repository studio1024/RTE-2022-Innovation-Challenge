'use strict'
const Controller = require('../base')

class SeeDoctorController extends Controller {
  async create() {
    const { ctx } = this
    const body = ctx.request.body

    ctx.validate(
      {
        pat_id: {
          type: 'int',
          required: true,
        },
        doc_id: {
          type: 'int',
          required: true,
        },
      },
      body
    )
    const res = await ctx.service.time.seeDoctor.create(body)
    if (res) {
      this.success(res)
    } else {
      this.error('创建失败！' + (res.msg || ''))
    }
  }

  async update() {
    const { ctx } = this
    const body = ctx.request.body
    ctx.validate(
      {
        id: {
          type: 'int',
          required: true,
        },
      },
      body
    )
    const res = await ctx.service.time.seeDoctor.update(body)
    if (res) {
      this.success(res)
    } else {
      this.error('修改失败！' + (res.msg || ''))
    }
  }

  async page() {
    const { ctx } = this
    const body = ctx.request.body
    const res = await ctx.service.time.seeDoctor.page(body)
    if (res) {
      return this.success(res)
    } else {
      this.error('修改失败！' + (res.msg || ''))
    }
  }

  async delete() {
    const { ctx } = this
    const body = ctx.request.body

    ctx.validate(
      {
        id: {
          type: 'int',
          required: true,
        },
      },
      body
    )
    const res = await ctx.service.time.seeDoctor.delete(body)
    if (res) {
      this.success(res)
    } else this.error('删除失败！' + (res.msg || ''))
  }
}
module.exports = SeeDoctorController
