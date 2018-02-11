const Sequelize = require("sequelize");
const config = require("../config");

class Database {
  constructor() {
    this.database = new Sequelize({
      database: config.dbData,
      username: config.dbUser,
      password: config.dbPass,
      host: "localhost",
      dialect: "postgres",
      logging: false
    });

    this.keys = this.database.define("keys", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      key: {
        type: Sequelize.STRING,
        unique: true
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  }
}

module.exports = Database;