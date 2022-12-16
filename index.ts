import express, {Express, Request, Response} from "express";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import indexRouter from "./routes/index";
dotenv.config();

const LocalStrategy = passportLocal.Strategy;

const mongoDB = `${process.env.MONGODB}`;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.log.bind(console, "db connection error"));

const app: Express = express();

app.use(express.json());


app.use("/", indexRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})