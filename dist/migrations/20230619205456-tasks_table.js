'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable("task_table", {
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
            task_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            completed: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("task_table");
    },
};
