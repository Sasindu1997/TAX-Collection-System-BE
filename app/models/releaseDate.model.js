module.exports = (sequelize, Sequelize) => {
  const ReleaseDate = sequelize.define('releaseDate', {
    rid: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    type: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    note: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  })

  return ReleaseDate
}
