import express, {Express, Request, Response} from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app: Express = express();

import indexRouter from "./routes/index";

app.use("/", indexRouter);

app.get("/",(req: Request,res: Response)=>{
    res.send(`Hello ${process.env.USER}`)
})

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})