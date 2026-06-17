import express,{Express} from 'express'
const app:Express = express();
import userRouter from "./router/user.routes.js"

app.get("/health",(_req,res)=>{
        res.json({
            status:'ok',
            timestamp:new Date().toISOString()
        })
})

app.use("/users",userRouter);// if the route starts with users the express app will handle it 
export { app };