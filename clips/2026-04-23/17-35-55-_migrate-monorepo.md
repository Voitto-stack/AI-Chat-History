---
date: 2026-04-23T17:35:55+08:00
source: clipboard
chars: 1056
---

/migrate-monorepo                    
  你对比一下work目录下的sitin-monorepo 
  项目的social-proxy，看看 脚本管理    
  这个list接口怎么做的，现在这个项目的 
st接口在测试环境上报错：{              
    "success": false,                  
    "error": {                         
        "code": "INTERNAL_ERROR",      
        "message": "fetch failed",     
        "stack": "TypeError: fetch     
failed\n    at node:internal/deps/undi 
ci/undici:14976:13\n    at             
process.processTicksAndRejections (nod 
e:internal/process/task_queues:95:5)\n 
    at async /app/routes/social-proxy/ 
index.js:27:17\n    at async           
authMiddleware                         
(/app/middlewares/auth.js:36:9)\n      
at async requestLogger (/app/middlewar 
es/requestLogger.js:6:5)\n    at async 
 errorHandler (/app/middlewares/errorH 
andler.js:8:9)\n    at async cors      
(/app/node_modules/@koa/cors/index.js: 
109:16)"                               
    }                                  
}           
