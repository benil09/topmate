import express,{Express,Request,Response, NextFunction} from 'express'
const app:Express = express();
import userRouter from "./router/user.routes.js"


// middleware logger function
function customLogger(req:Request,_res:Response,next:NextFunction){

        console.log("URL: ", req.url);
        console.log("Executed customLogger middleware");
        next(); // call my next function
}
function customLogger2(req:Request,_res:Response,next:NextFunction){

        console.log("URL: ", req.url);
        console.log("Executed custom Logger 2 middleware");
        next(); // call my next function
}

app.use(express.json()); // <-- this will help express to deserialize the request body (JSON) into a JavaScript object (i.e. helps express to read the data that what type of data is coming)
app.use(express.text());
app.use(express.urlencoded());

const seq = [customLogger , customLogger2];
app.get('/health2', seq , (_req:Request, res:Response) => {
    console.log("Executed health route");
    res.json({
        status: 'ok!',
        timestamp: new Date().toISOString()
    })

});

app.get("/health",(_req,res)=>{
        res.json({
            status:'ok',
            timestamp:new Date().toISOString()
        })
})

app.use("/users",userRouter);// if the route starts with users the express app will handle it 
export { app };