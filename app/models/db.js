const Sequelize = require('sequelize')
const config = require('../config/db.config')

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.lesson = require('../models/lessons.models')(db.sequelize, db.Sequelize)
db.publication = require('../models/publications.models')(db.sequelize, db.Sequelize)


db.lesson.hasMany(db.publication)
db.publication.belongsTo(db.lesson)

module.exports = db