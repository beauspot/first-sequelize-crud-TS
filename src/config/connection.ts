import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();
// import your models here

const connection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
  models: ["TasksModel", "AuthModel"],
});

//console.log(connection);
export default connection;
