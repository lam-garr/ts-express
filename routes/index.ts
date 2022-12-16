import express from "express";
import { builtinModules } from "module";
import {get_index, get_other, post_sign_up, log_in, log_out} from "../controllers/indexController";

const router = express.Router();

router.get("/", get_index);

router.get("/other", get_other)

router.post('sign-up', post_sign_up);

router.post('log-in', log_in);

router.get('log-out', log_out)

export default router;