module.exports = (option, app) => {
    return async function errorHandler(ctx, next) {
      try {
        await next(); 
        // 404 处理
        if(ctx.status === 404 && !ctx.body){
           ctx.body = { 
               msg:"fail",
               data:'Not Find'
           };
        }
      } catch (err) {
        const status = err.status || 500;
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const error = status === 500 && app.config.env === 'prod'? 'Internal Server Error': err.message;
        ctx.body = { 
            msg:"fail",
            data:error
        };
        ctx.status = status;
      }
    };
  };