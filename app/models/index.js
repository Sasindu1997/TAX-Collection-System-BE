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

// db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize)
// db.customers = require('./customer.model.js')(sequelize, Sequelize)
// db.users = require('./user.model.js')(sequelize, Sequelize)
// db.subCategories = require('./subCategory.model.js')(sequelize, Sequelize)
// db.categories = require('./category.model.js')(sequelize, Sequelize)

db.client = require('./client.model.js')(sequelize, Sequelize)
db.group = require('./group.model.js')(sequelize, Sequelize)
db.loan = require('./loan.model.js')(sequelize, Sequelize)
db.payment = require('./payment.model.js')(sequelize, Sequelize)
db.releaseDate = require('./releaseDate.model.js')(sequelize, Sequelize)
db.user = require('./user.model.js')(sequelize, Sequelize)

// db.categories.hasMany(db.subCategories, { foreignKey: 'categoryId', targetKey: 'id' })
// db.subCategories.belongsTo(db.categories, { foreignKey: 'categoryId', targetKey: 'id' })

db.client.hasMany(db.loan, { as: 'clientid', foreignKey: 'cid' })
db.loan.belongsTo(db.client, { as: 'clientid', foreignKey: 'cid' })

db.group.hasMany(db.loan, { as: 'groupid', foreignKey: 'gid' })
db.loan.belongsTo(db.group, { as: 'groupid', foreignKey: 'gid' })

db.loan.hasMany(db.payment, { as: 'loanid', foreignKey: 'pid' })
db.payment.belongsTo(db.loan, { as: 'loanid', foreignKey: 'pid' })

db.payment.hasOne(db.user, { as: 'collectorid', foreignKey: 'uid' })
db.user.belongsTo(db.payment, { as: 'collectorid', foreignKey: 'uid' })

module.exports = db
