module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    uid: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    userName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING,
      defaultValue: 'user'
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    nic: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  })

  return User
}
