'use strtic'
const Service = require('egg').Service

class DictService extends Service { 

    async create(body){
        const { ctx } = this
        try {
            const user = await ctx.model.Time.Dict.create(body)
            console.log(user);
            return { success:true, msg:'新增成功'}
        } catch (error) {
            console.log(error);
            return { success:false }
        }
    }

    async update(body){
        const { ctx } = this 
        try {
            const res = await ctx.model.Time.Dict.update(body, {
                where: {
                    id:body.id
                }
            })
            return {success:true, msg:'更新成功'}
        } catch (error) {
            return {success:false}
        }
    }

    async query(){
        const { ctx } = this
        try {
            const res = await ctx.model.Time.Dict.findAll()
            return { success:true, msg:'查询成功',Data:res}
        } catch (error) {
            return { success:false}
        }
    }

    async delete(body){
        const { ctx } = this 
        try {
            const res = await ctx.model.Time.Dict.delete({
                where: {
                    id:body.id
                }
            })
            return {success:true, msg:'删除成功'}
        } catch (error) {
            return {success:false}
        }
    }

}

module.exports = DictService