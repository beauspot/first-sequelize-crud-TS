"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("tiny"));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, xss_clean_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, express_session_1.default)({
    resave: false,
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: true,
    cookie: {
        sameSite: "strict",
        secure: false,
        maxAge: 1000 * 60 * 60,
    },
}));
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Welcome to Esxpress REST API with Typescript And Sequelize.",
    });
});
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3030;
const start = async () => {
    try {
        app.listen(SERVER_PORT, () => console.log(`Server started on port ${SERVER_PORT}`));
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
void start();
