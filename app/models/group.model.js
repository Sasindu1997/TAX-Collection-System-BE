module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define('group', {
    gid: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  })

  return Group
}
