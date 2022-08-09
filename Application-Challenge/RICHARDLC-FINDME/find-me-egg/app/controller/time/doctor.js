'use strict'
const Controller = require('../base')

class DoctorController extends Controller {
    async login(){
        const {
            ctx
        } = this
        const body = ctx.request.body
        console.log(body);
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
        const res = await ctx.service.time.doctor.login(body)
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
        this.success(await ctx.service.time.doctor.getCurUserInfo())
    }

    async page() {
        const { ctx } = this
        // const query = ctx.query
        // console.log(query);
        const body = ctx.request.body
        ctx.validate({
            page: {
                type: 'int',
                required: true
            },
            limit: {
                type: 'int',
                required: true
            }
        }, body)

        const res = await ctx.service.time.doctor.page(body)
        if (res) {
            this.success(res)
        } else {
            this.error('查询失败！')
        }
    }

    async create() {
        const { ctx } = this
        const body = ctx.request.body
        
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
            },
            of_medical: {
                type: 'string',
                required: true
            },
            department: {
                type: 'string',
                required: true
            },
            online_time: {
                type: 'string',
                required: true
            }
        }, body)
        // console.log(body);
        const res = await ctx.service.time.doctor.create(body)
        if (res) {
            this.success(res)
        } else {
            this.error('添加失败！'  + (res.msg || ''))
        }
    }
    
    async getCurUserInfo(){
        const { ctx } = this
        const res = await ctx.service.time.doctor.getCurUserInfo()
        if (res) {
            this.success(res)
        } else {
            this.error('添加失败！'  + (res.msg || ''))
        }

    }

    async changePsw(){
        const { ctx } = this
        const body = ctx.request.body
        console.log(body);
        console.log(1123);
        ctx.validate({
                old_pass: {
                    type: 'string',
                    required: true
                },
                pass: {
                    type: 'string',
                    required: true
                }
            }, body)
            console.log(body);
        const res = await ctx.service.time.doctor.changePsw(body)
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
        const res = await ctx.service.time.doctor.update(body)
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
        const res = await ctx.service.time.doctor.delete(body)
        if (res) {
            this.success(res)
        } else {
            this.error('删除失败！'  + (res || ''))
        }

    }
}

module.exports = DoctorController