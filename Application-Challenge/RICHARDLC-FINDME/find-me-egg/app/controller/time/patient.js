'use strict'
const Controller = require('../base')

class PatientController extends Controller {
    async login(){
        const {
            ctx
        } = this
        const body = ctx.request.body
        ctx.validate({
            tel: {
                type: 'string',
                required: true
            },
            password: {
                type: 'string',
                required: true
            }
        }, body)

        const res = await ctx.service.time.patient.login(body)
        if (res.success) {
            this.success(res.msg)
        } else {
            this.error(res.msg)
        }
    }

    async getCurUserInfo() {
        const {
            ctx
        } = this
        this.success(await ctx.service.time.patient.getCurUserInfo())
    }

    // async page() {
    //     const { ctx } = this
    //     const query = ctx.query
    //     ctx.validate({
    //         page: {
    //             type: 'string',
    //             required: true
    //         },
    //         limit: {
    //             type: 'string',
    //             required: true
    //         }
    //     }, query)

    //     const res = await ctx.service.mini.user.page(query)
    //     if (res) {
    //         this.success(res)
    //     } else {
    //         this.error('查询失败！')
    //     }
    // }

    async create() {
        const { ctx } = this
        const body = ctx.request.body
        
        console.log(body);
        ctx.validate({
            name: {
                type: 'string',
                required: true
            },
            tel: {
                type: 'string',
                required: true
            },
            sex: {
                type: 'string',
                required: true
            },
            // birthday: {
            //     type: 'string',
            //     required: true
            // },
            password: {
                type: 'string',
                required: true
            }
        }, body)
        const res = await ctx.service.time.patient.create(body)
        if (res) {
            this.success(res)
        } else {
            this.error('添加失败！'  + (res.msg || ''))
        }
    }
    
    // async getCurUserInfo(){
    //     const { ctx } = this
    //     const res = await ctx.service.time.patient.getCurUserInfo()
    //     if (res) {
    //         this.success(res)
    //     } else {
    //         this.error('添加失败！'  + (res.msg || ''))
    //     }

    // }

    async changePsw(){
        const { ctx } = this
        const body = ctx.request.body
        ctx.validate({
            // tel: {
                //     type: 'string',
                //     required: true
                // },
                old_pass: {
                    type: 'string',
                    required: true
                },
                pass: {
                    type: 'string',
                    required: true
                }
            }, body)
        const res = await ctx.service.time.patient.changePsw(body)
        if (res) {
            this.success(res)
        } else {
            this.error('修改失败！'  + (res.msg || ''))
        }

    }

    async update(){
        const { ctx } = this
        const body = ctx.request.body
        
        ctx.validate({
            id: {
                type: 'int',
                required: true
            }
        }, body)
        const res = await ctx.service.time.patient.update(body)
        if (res) {
            this.success(res)
        } else {
            this.error('修改失败！'  + (res.msg || ''))
        }

    }

    async delete(){
        const { ctx } = this
        const body = ctx.request.body
        
        ctx.validate({
            id: {
                type: 'int',
                required: true
            }
        }, body)
        const res = await ctx.service.time.patient.delete(body)
        if (res) {
            this.success(res)
        } else {
            this.error('删除失败！'  + (res || ''))
        }

    }
}

module.exports = PatientController