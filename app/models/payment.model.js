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
    timestamp: {
      type: Sequelize.STRING
    },
    collector: {
      type: Sequelize.STRING
    },
    paymentMode: {
      type: Sequelize.STRING
    },
    updatedDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  })

  return Payment
}
