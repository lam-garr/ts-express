"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log_out = exports.log_in = exports.post_sign_up = exports.get_other = exports.get_index = void 0;
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
function get_index(req, res) {
    res.send("Hello World");
}
exports.get_index = get_index;
;
function get_other(req, res) {
    res.send("Other");
}
exports.get_other = get_other;
function post_sign_up(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasedpw = yield bcrypt_1.default.hash(req.body.password, 10);
        const user = new users_1.default({
            username: req.body.username,
            password: hasedpw
        }).save(err => {
            if (err) {
                return next(err);
            }
            res.send("success");
        });
    });
}
exports.post_sign_up = post_sign_up;
function log_in(req, res, next) {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send("user not found");
        }
        if (info) {
            return res.send(`${info.message}`);
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.send(`user logged in as ${user.id}`);
        });
    })(req, res, next);
}
exports.log_in = log_in;
function log_out(req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.send("logged out");
    });
}
exports.log_out = log_out;
