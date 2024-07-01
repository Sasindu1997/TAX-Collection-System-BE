module.exports = (sequelize, Sequelize) => {
  const ReleaseDate = sequelize.define('releaseDate', {
    type: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATETIME
    },
    note: {
      type: Sequelize.STRING
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

  return ReleaseDate
}
