const Sequelize = require("sequelize");
const Database = require("../structures/Database");

const keys = Database.db.define("keys", {
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

module.exports = keys;