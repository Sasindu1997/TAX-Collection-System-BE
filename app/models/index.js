const dbConfig = require('../config/db.config.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.client = require('./client.model.js')(sequelize, Sequelize)
db.group = require('./group.model.js')(sequelize, Sequelize)
db.loan = require('./loan.model.js')(sequelize, Sequelize)
db.payment = require('./payment.model.js')(sequelize, Sequelize)
db.releaseDate = require('./releaseDate.model.js')(sequelize, Sequelize)
db.user = require('./user.model.js')(sequelize, Sequelize)

db.client.hasMany(db.loan, { as: 'clientid', foreignKey: 'client' })
db.loan.belongsTo(db.client, { as: 'clientid', foreignKey: 'client' })

db.group.hasMany(db.loan, { as: 'groupid', foreignKey: 'group' })
db.loan.belongsTo(db.group, { as: 'groupid', foreignKey: 'group' })

db.loan.hasMany(db.payment, { as: 'loanid', foreignKey: 'loan' })
db.payment.belongsTo(db.loan, { as: 'loanid', foreignKey: 'loan' })

db.user.hasMany(db.payment, { as: 'collectorid', foreignKey: 'collector' })
db.payment.belongsTo(db.user, { as: 'collectorid', foreignKey: 'collector' })

module.exports = db
