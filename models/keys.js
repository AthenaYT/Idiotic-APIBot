const Sequelize = require("sequelize");
const Database = require("../structures/Database");

const keys = Database.db.define("apikeys", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: Sequelize.STRING,
    unique: true
  },
  owner: {
    type: Sequelize.STRING,
    allowNull: true
  },
  bot: {
    type: Sequelize.STRING,
    allowNull: true
  },
  approvedby: {
    type: Sequelize.STRING,
    allowNull: true
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = keys;