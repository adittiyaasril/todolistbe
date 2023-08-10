const dbConfig = require("../config/db.config.js");

// eslint-disable-next-line no-unused-vars
const pg = require("pg");

const Sequelize = require("sequelize");
const client = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  dialectModule: require("pg"),

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.client = client;

// MODELS
db.users = require("./user.js")(client, Sequelize);
db.todolists = require("./todolist.js")(client, Sequelize);

// ASSOCIATIONS
db.users.hasMany(db.todolists, { foreignKey: "userId", onDelete: "CASCADE" });
db.todolists.belongsTo(db.users, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = db;
