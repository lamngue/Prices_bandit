const dbConfig = require('../config/database.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected...')
})
.catch(err => {
    console.log('Error ', err)
})

db.Sequelize = Sequelize
db.sequelize = sequelize

db.superMarkets = require('./supermarket_schemas.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('Re-sync done!')
});

module.exports = db