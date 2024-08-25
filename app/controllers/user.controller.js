/* eslint-disable eqeqeq */
const db = require('../models')
const Users = db.user
const Op = db.Sequelize.Op

// Create and Save a new Users
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.lastName || !req.body.nic ||
    !req.body.userName || !req.body.password || !req.body.type) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // validate nic and phone number
  const nic = req.body.nic
  const phone = req.body.phoneNumber
  if (nic.length != 10 || (phone && phone.length != 10)) {
    res.status(400).send({
      message: 'NIC and Phone number should be of 10 digits!'
    })
    return
  }

  // Create a Users
  const users = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nic: req.body.nic,
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
    type: req.body.type,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    isActive: req.body.isActive ? req.body.isActive : true
  }

  // Save Users in the database
  Users.create(users)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Users.'
      })
    })
}

// Retrieve all Userss from the database.
exports.findAll = (req, res) => {
  const firstName = req.query.firstName
  const condition = firstName
    ? {
        firstName: {
          [Op.like]: `%${firstName}%`
        }
      }
    : null

  Users.findAll({ where: condition, order: Users.sequelize.literal('createdAt DESC') })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving userss.'
      })
    })
}

// Find a single Users with an id
exports.findOne = (req, res) => {
  const uid = req.params.uid

  Users.findByPk(uid)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Users with id=${uid}.`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving Users with id=' + uid
      })
    })
}

// Update a Users by the id in the request
exports.update = (req, res) => {
  const uid = req.params.uid

  Users.update(req.body, {
    where: { uid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update User with id=${uid}. Maybe User was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating User with id=' + uid
      })
    })
}

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
  const uid = req.params.uid

  Users.destroy({
    where: { uid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Users was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Users with id=${uid}. Maybe Users was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete Users with id=' + uid
      })
    })
}

// Delete all Userss from the database.
exports.deleteAll = (req, res) => {
  Users.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Userss were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all userss.'
      })
    })
}

// Find all published Userss
exports.findAllPublished = (req, res) => {
  Users.findAll({ where: { published: true } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving userss.'
      })
    })
}

// Marketing Manager
exports.findAllByType = (req, res) => {
  const type = req.query.type
  const condition = type
    ? {
        type: {
          [Op.like]: `%${type}%`
        }
      }
    : null

  Users.findAll({ where: condition, order: Users.sequelize.literal('uid DESC') })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving userss.'
      })
    })
}

exports.findAllByPhone = (req, res) => {
  const phoneNumber = req.query.phoneNumber
  const condition = phoneNumber
    ? {
        phoneNumber: {
          [Op.like]: `%${phoneNumber}%`
        }
      }
    : null

  Users.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Users.'
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

  Users.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Clients.'
      })
    })
}
