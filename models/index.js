const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, 
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/userModel.js')(sequelize, DataTypes);

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database sync complete.');
    })
    .catch(err => {
        console.error('Error syncing the database:', err);
    });

module.exports = db;
