import express from "express";
import { builtinModules } from "module";
import {get_index, get_other} from "../controllers/indexController";

const router = express.Router();

router.get("/", get_index);

router.get("/other", get_other)

export default router;