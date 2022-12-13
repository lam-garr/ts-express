import express, {Express, Request, Response} from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app: Express = express();

app.use(express.json());

import indexRouter from "./routes/index";

app.use("/", indexRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})