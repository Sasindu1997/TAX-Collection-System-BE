module.exports = (sequelize, Sequelize) => {
  const ReleaseDate = sequelize.define('releaseDate', {
    type: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    note: {
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

  return ReleaseDate
}
