"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const userposts_1 = require("./userposts");
let AuthModel = exports.AuthModel = class AuthModel extends sequelize_typescript_1.Model {
    static id;
    email;
    username;
    password;
    static async hashPassword(instance) {
        if (instance.changed("password")) {
            const salt = await bcryptjs_1.default.genSalt(10);
            instance.password = await bcryptjs_1.default.hash(instance.password, salt);
        }
    }
    createJWT() {
        const token = jsonwebtoken_1.default.sign({
            userId: this.id,
            name: this.username,
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
        return token;
    }
    async comparePwd(pwd) {
        const comparePwd = await bcryptjs_1.default.compare(pwd, this.password);
        return comparePwd;
    }
    tasks;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            IsEmail: {
                msg: "Please Provide  valid Email Address",
            },
            NotEmpty: {
                msg: "Please the email field should not be empty.",
            },
        },
    }),
    __metadata("design:type", String)
], AuthModel.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isLowercase: {
                msg: "The username must be in lower caps",
            },
            notEmpty: {
                msg: "The username must not be empty",
            },
            len: {
                args: [8, 17],
                msg: "Username must be between 8 and 17 characters.",
            },
        },
    }),
    __metadata("design:type", String)
], AuthModel.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Please provide a password.",
            },
            len: {
                args: [8, 20],
                msg: "Password must be between 8 and 20 characters.",
            },
        },
    }),
    __metadata("design:type", String)
], AuthModel.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => userposts_1.TasksModel),
    __metadata("design:type", Array)
], AuthModel.prototype, "tasks", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(uuid_1.v4),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], AuthModel, "id", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    sequelize_typescript_1.BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthModel]),
    __metadata("design:returntype", Promise)
], AuthModel, "hashPassword", null);
exports.AuthModel = AuthModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "auth-table",
        timestamps: true,
    })
], AuthModel);
