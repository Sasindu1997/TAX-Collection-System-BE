const db = require('../models')
const Client = db.client
const Op = db.Sequelize.Op

// Create and Save a new Client
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.lastName || !req.body.nic) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a Client
  const client = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    nic: req.body.nic,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    shopName: req.body.shopName,
    shopAddress: req.body.shopAddress,
    route: req.body.route,
    isActive: req.body.isActive ? req.body.isActive : true
  }

  // Save Client in the database
  Client.create(client)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Client.'
      })
    })
}

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
  const firstName = req.query.firstName
  const condition = firstName
    ? {
        fullName: {
          [Op.like]: `%${firstName}%`
        }
      }
    : null

  Client.findAll({ where: condition, order: Client.sequelize.literal('createdAt DESC') })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Clients.'
      })
    })
}

// Retrieve Client from the database by phone.
exports.findAllByPhone = (req, res) => {
  const phoneNumber = req.query.phoneNumber
  const condition = phoneNumber
    ? {
        phoneNumber: {
          [Op.like]: `%${phoneNumber}%`
        }
      }
    : null

  Client.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Clients.'
      })
    })
}

exports.findAllByNic = (req, res) => {
  const nic = req.query.nic
  const condition = nic
    ? {
        nic: {
          [Op.like]: `%${nic}%`
        }
      }
    : null

  Client.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Clients.'
      })
    })
}

// Find a single Client with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Client.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Client with id=${id}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Client with id=' + id + ' ' + err
      })
    })
}

// Update a Client by the id in the request
exports.update = (req, res) => {
  const cid = req.params.id

  Client.update(req.body, {
    where: { cid }
  })
    .then(num => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.send({
          message: 'Client was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Client with id=${cid}. Maybe Client was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Client with id=' + cid + ' ' + err
      })
    })
}

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
  const cid = req.params.id

  Client.destroy({
    where: { cid }
  })
    .then(num => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.send({
          message: 'Client was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Client with id=${cid}. Maybe Client was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Client with id=' + cid + ' ' + err
      })
    })
}

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
  Client.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Clients were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Clients.'
      })
    })
}

// Find all active Clients
exports.findAllActive = (req, res) => {
  Client.findAll({ where: { isActive: true } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Clients.'
      })
    })
}
