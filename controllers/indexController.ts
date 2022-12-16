import express, {Request, Response, NextFunction} from "express"
import User from "../models/users";
import bcrypt from "bcrypt";
import passport from "passport";

export function get_index(req:Request, res:Response){
    res.send("Hello World");
};

export function get_other(req: Request, res:Response){
    res.send("Other")
}

export async function post_sign_up(req: Request, res: Response, next: NextFunction){
    const hasedpw = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        username: req.body.username,
        password: hasedpw
    }).save(err => {
        if(err){
            return next(err);
        }
        res.send("success")
    })
}

export function log_in(req:Request, res: Response, next: NextFunction){
    passport.authenticate("local", (err, user, info) => {
        if(err){
            return next(err);
        }

        if(!user){
            return res.send("user not found");
        }

        if(info){
            return res.send(`${info.message}`);
        }

        req.login(user, (err)=>{
            if(err){
                return next(err);
            }

            return res.send(`user logged in as ${user.id}`)
        })
    })(req, res, next);
}

export function log_out(req: Request, res: Response, next: NextFunction){
    req.logout(function (err){
        if(err){
            return next(err);
        }
        res.send("logged out")
    })
}