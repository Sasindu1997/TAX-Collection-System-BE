const db = require('../models')
const Payment = db.payment
const Op = db.Sequelize.Op

// Create and Save a new payment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.loan || !req.body.amount || !req.body.collector) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a payment
  const payment = {
    loan: req.body.loan,
    amount: req.body.amount,
    collector: req.body.collector,
    isActive: req.body.isActive ? req.body.isActive : true
  }

  // Save payment in the database
  Payment.create(payment)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the payment.'
      })
    })
}

// Retrieve all payments from the database.
exports.findAll = (req, res) => {
  const loan = req.query.loan
  const condition = loan
    ? {
        fullName: {
          [Op.like]: `%${loan}%`
        }
      }
    : null

  Payment.findAll({ where: condition, order: Payment.sequelize.literal('createdAt DESC') })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving payments.'
      })
    })
}

// Find a single payment with an id
exports.findOne = (req, res) => {
  const pid = req.params.id

  Payment.findByPk(pid)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find payment with id=${pid}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving payment with id=' + pid + ' ' + err
      })
    })
}

// Update a payment by the id in the request
exports.update = (req, res) => {
  const pid = req.params.id

  Payment.update(req.body, {
    where: { pid }
  })
    .then(num => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.send({
          message: 'payment was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update payment with id=${pid}. Maybe payment was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating payment with id=' + pid + ' ' + err
      })
    })
}

// Delete a payment with the specified id in the request
exports.delete = (req, res) => {
  const pid = req.params.id

  Payment.destroy({
    where: { pid }
  })
    .then(num => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.send({
          message: 'payment was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete payment with id=${pid}. Maybe payment was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete payment with id=' + pid + ' ' + err
      })
    })
}

// Delete all payments from the database.
exports.deleteAll = (req, res) => {
  Payment.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} payments were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all payments.'
      })
    })
}

// Find all active payments
exports.findAllActive = (req, res) => {
  Payment.findAll({ where: { isActive: true } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving payments.'
      })
    })
}
