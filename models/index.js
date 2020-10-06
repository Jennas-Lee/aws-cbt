const Sequelize = require('sequelize');
const config = require('./../config/config')[env];
const User = require('./user');
const Problem = require('./problem');
const Solve = require('./solve');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Problem = Problem;
db.Solve = Solve;

User.init(sequelize);
Problem.init(sequelize);
Solve.init(sequelize);

User.associate(db);
Problem.associate(db);
Solve.associate(db);

module.exports = db;