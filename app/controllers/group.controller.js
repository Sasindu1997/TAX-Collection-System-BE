const db = require('../models')
const Group = db.group
const Op = db.Sequelize.Op

// Create and Save a new group
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a group
  const group = {
    name: req.body.name,
    isActive: req.body.isActive ? req.body.isActive : true
  }

  // Save group in the database
  Group.create(group)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the group.'
      })
    })
}

// Retrieve all groups from the database.
exports.findAll = (req, res) => {
  const name = req.query.name
  const condition = name
    ? {
        fullName: {
          [Op.like]: `%${name}%`
        }
      }
    : null

  Group.findAll({ where: condition, order: Group.sequelize.literal('createdAt DESC') })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving groups.'
      })
    })
}

// Find a single group with an id
exports.findOne = (req, res) => {
  const gid = req.params.id

  Group.findByPk(gid)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find group with id=${gid}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving group with id=' + gid + ' ' + err
      })
    })
}

// Update a group by the id in the request
exports.update = (req, res) => {
  const gid = req.params.id

  Group.update(req.body, {
    where: { gid }
  })
    .then(num => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.send({
          message: 'group was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update group with id=${gid}. Maybe group was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating group with id=' + gid + ' ' + err
      })
    })
}

// Delete a group with the specified id in the request
exports.delete = (req, res) => {
  const gid = req.params.id

  Group.destroy({
    where: { gid }
  })
    .then(num => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.send({
          message: 'group was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete group with id=${gid}. Maybe group was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete group with id=' + gid + ' ' + err
      })
    })
}

// Delete all groups from the database.
exports.deleteAll = (req, res) => {
  Group.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} groups were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all groups.'
      })
    })
}

// Find all active groups
exports.findAllActive = (req, res) => {
  Group.findAll({ where: { isActive: true } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving groups.'
      })
    })
}
