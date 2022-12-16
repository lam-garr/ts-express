"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./models/users"));
dotenv.config();
const LocalStrategy = passport_local_1.default.Strategy;
const mongoDB = `${process.env.MONGODB}`;
mongoose_1.default.connect(mongoDB);
const db = mongoose_1.default.connection;
db.on("error", console.log.bind(console, "db connection error"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({ secret: `${process.env.SECRET}`, resave: false, saveUninitialized: true }));
app.use(passport_1.default.session());
//passport
passport_1.default.use(new LocalStrategy((username, password, done) => {
    users_1.default.findOne({ username: username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        bcrypt_1.default.compare(password, user.password, (err, res) => {
            if (res) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    });
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (id, done) {
    users_1.default.findById(id, function (err, user) {
        done(err, user);
    });
});
app.use(passport_1.default.initialize());
app.use("/", index_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
