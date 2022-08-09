'use strict'
const Controller = require('../base')

class CommentsController extends Controller {

    async create() {
        const { ctx } = this
        const body = ctx.request.body
        
        ctx.validate({
            see_id: {
                type: 'int',
                required: true
            }
        }, body)
        // console.log(body);
        const res = await ctx.service.time.comments.create(body)
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
        const res = await ctx.service.time.comments.update(body)
        if (res) {
            this.success(res)
        }else{
            this.error('修改失败！'  + (res.msg || ''))
        }
    }
    
    async query(){
        const { ctx } = this
        const body = ctx.request.body
        const res = await ctx.service.time.comments.query(body)
        if (res) {
            return this.success(res)
        }else{
            this.error('查询失败！'  + (res.msg || ''))
        }
    }
    
    // async delete(){
    //     const {ctx} = this
    //     const body = ctx.request.body
        
    //     ctx.validate({
    //         id: {
    //             type: 'int',
    //             required: true
    //         }
    //     }, body)
    //     const res = await ctx.service.time.comments.delete(body)
    //     if (res) {
    //         this.success(res)
    //     }else
    //     this.error('删除失败！'  + (res.msg || ''))
    // }
    
    
}
module.exports = CommentsController