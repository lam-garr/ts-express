import express, {Express, Request, Response} from "express";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import indexRouter from "./routes/index";
import User from "./models/users";
import userInterface from "./interfaces";
dotenv.config();

declare global {
    namespace Express {
        interface User {
            username: string;
            _id?: string;
        }
    }
}

const LocalStrategy = passportLocal.Strategy;

const mongoDB = `${process.env.MONGODB}`;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.log.bind(console, "db connection error"));

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({secret: `${process.env.SECRET}`, resave: false, saveUninitialized: true}));

app.use(passport.session());

//passport
passport.use(
    new LocalStrategy((username: string, password: string, done) => {
        User.findOne({username: username}, (err: Error|string|undefined, user: userInterface) => {
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false);
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if(res){
                    return done(null, user);
                }else{
                    return done(null, false);
                }
            })
        })
    })
)

passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err: Error|string|undefined, user: userInterface){
        done(err, user);
    });
});
app.use(passport.initialize());
app.use("/", indexRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})