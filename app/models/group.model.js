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
    updatedDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  })

  return Group
}
