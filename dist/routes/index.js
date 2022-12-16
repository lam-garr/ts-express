"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexController_1 = require("../controllers/indexController");
const router = express_1.default.Router();
router.get("/", indexController_1.get_index);
router.get("/other", indexController_1.get_other);
router.post('/sign-up', indexController_1.post_sign_up);
router.post('/log-in', indexController_1.log_in);
router.get('/log-out', indexController_1.log_out);
exports.default = router;
