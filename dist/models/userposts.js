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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const uuid_1 = require("uuid");
const userauth_1 = require("./userauth");
let TasksModel = exports.TasksModel = class TasksModel extends sequelize_typescript_1.Model {
    static id;
    task_name;
    completed;
    authorId;
    author;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], TasksModel.prototype, "task_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], TasksModel.prototype, "completed", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => userauth_1.AuthModel),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TasksModel.prototype, "authorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => userauth_1.AuthModel),
    __metadata("design:type", userauth_1.AuthModel)
], TasksModel.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(uuid_1.v4),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], TasksModel, "id", void 0);
exports.TasksModel = TasksModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "tasks-table",
    })
], TasksModel);
