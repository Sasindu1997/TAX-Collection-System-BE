module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define('payment', {
    pid: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    loan: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.FLOAT
    },
    collector: {
      type: Sequelize.STRING
    },
    paymentMode: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  })

  return Payment
}
