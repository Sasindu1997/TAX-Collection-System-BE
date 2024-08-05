const db = require('../models')
const ReleaseDate = db.releaseDate
const Op = db.Sequelize.Op

// Create and Save a new releaseDate
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date || !req.body.type) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a releaseDate
  const releaseDate = {
    type: req.body.type,
    date: req.body.date,
    note: req.body.note,
    isActive: req.body.isActive ? req.body.isActive : true
  }

  // Save releaseDate in the database
  ReleaseDate.create(releaseDate)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the releaseDate.'
      })
    })
}

// Retrieve all releaseDates from the database.
exports.findAll = (req, res) => {
  const type = req.query.type
  const condition = type
    ? {
        fullName: {
          [Op.like]: `%${type}%`
        }
      }
    : null

  ReleaseDate.findAll({ where: condition, order: ReleaseDate.sequelize.literal('createdAt DESC') })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving releaseDates.'
      })
    })
}

// Find a single releaseDate with an id
exports.findOne = (req, res) => {
  const rid = req.params.id

  ReleaseDate.findByPk(rid)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find releaseDate with id=${rid}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving releaseDate with id=' + rid + ' ' + err
      })
    })
}

// Update a releaseDate by the id in the request
exports.update = (req, res) => {
  const rid = req.params.id

  ReleaseDate.update(req.body, {
    where: { rid }
  })
    .then(num => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.send({
          message: 'releaseDate was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update releaseDate with id=${rid}. Maybe releaseDate was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating releaseDate with id=' + rid + ' ' + err
      })
    })
}

// Delete a releaseDate with the specified id in the request
exports.delete = (req, res) => {
  const rid = req.params.id

  ReleaseDate.destroy({
    where: { rid }
  })
    .then(num => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.send({
          message: 'releaseDate was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete releaseDate with id=${rid}. Maybe releaseDate was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete releaseDate with id=' + rid + ' ' + err
      })
    })
}

// Delete all releaseDates from the database.
exports.deleteAll = (req, res) => {
  ReleaseDate.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} releaseDates were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all releaseDates.'
      })
    })
}

// Find all active releaseDates
exports.findAllActive = (req, res) => {
  ReleaseDate.findAll({ where: { isActive: true } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving releaseDates.'
      })
    })
}
