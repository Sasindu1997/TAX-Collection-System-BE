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
    updatedDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  })

  return Loan
}
