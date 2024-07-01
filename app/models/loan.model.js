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
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: []
    },
    group: {
      type: Sequelize.STRING
    },
    startDate: {
      type: Sequelize.DATETIME
    },
    endDate: {
      type: Sequelize.DATETIME
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
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    },
    updatedDate: {
      type: Sequelize.DATETIME,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  })

  return Loan
}
