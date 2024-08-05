module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define('client', {
    cid: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
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
    shopName: {
      type: Sequelize.STRING
    },
    shopAddress: {
      type: Sequelize.STRING
    },
    route: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  })

  return Client
}
