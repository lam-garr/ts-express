import express, {Request, Response} from "express"

export function get_index(req:Request, res:Response){
    res.send("Hello World");
};

export function get_other(req: Request, res:Response){
    res.send("Other")
}