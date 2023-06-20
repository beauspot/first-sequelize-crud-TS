// ts-migrate.js
require("ts-node").register();
const { run } = require("sequelize-cli-typescript/lib/runner");
run();
