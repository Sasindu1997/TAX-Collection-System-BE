module.exports = (sequelize, Sequelize) => {
  const Loan = sequelize.define('loan', {
    lid: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    client: {
      type: Sequelize.STRING
    },
    guarantees: {
      type: Sequelize.JSON,
      defaultValue: []
    },
    group: {
      type: Sequelize.STRING
    },
    startDate: {
      type: Sequelize.DATE
    },
    endDate: {
      type: Sequelize.DATE
    },
    amount: {
      type: Sequelize.FLOAT
    },
    interestRate: {
      type: Sequelize.FLOAT
    },
    dailyRental: {
      type: Sequelize.FLOAT
    },
    arreas: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    files: {
      type: Sequelize.JSON,
      defaultValue: []
    },
    images: {
      type: Sequelize.JSON,
      defaultValue: []
    },
    isActive: {
      type: Sequelize.BOOLEAN
    },
    paymentPeriod: {
      type: Sequelize.STRING,
      defaultValue: ''
    }
  })

  return Loan
}
