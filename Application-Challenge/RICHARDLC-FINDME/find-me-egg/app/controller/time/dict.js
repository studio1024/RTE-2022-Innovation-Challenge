'use strict'
const await = require('await-stream-ready/lib/await')
const Controller = require('../base')

class DictController extends Controller {

    async create() {
        const { ctx } = this
        const body = ctx.request.body
        
        ctx.validate({
            type: {
                type: 'string',
                required: true
            },
            value: {
                type: 'string',
                required: true
            },
            label: {
                type: 'string',
                required: true
            }
        }, body)
        const res = await ctx.service.time.dict.create(body)
        if (res) {
            this.success(res)
        } else {
            this.error('添加失败！'  + (res.msg || ''))
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
        const res = await ctx.service.time.dict.update(body)
        if (res) {
            this.success(res)
        }else{
            this.error('修改失败！'  + (res.msg || ''))
        }
    }
    
    async query(){
        const { ctx } = this
        // const body = ctx.request.body
        const res = await ctx.service.time.dict.query()
        if (res) {
            return this.success(res)
        }else{
            this.error('查询失败！'  + (res.msg || ''))
        }
    }
    
    async delete(){
        const {ctx} = this
        const body = ctx.request.body
        
        ctx.validate({
            id: {
                type: 'int',
                required: true
            }
        }, body)
        const res = await ctx.service.time.dict.delete(body)
        if (res) {
            this.success(res)
        }else
        this.error('删除失败！'  + (res.msg || ''))
    }
    
    
}
module.exports = DictController