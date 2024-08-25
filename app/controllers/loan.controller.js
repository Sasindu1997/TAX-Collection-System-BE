const db = require('../models')
const Loan = db.loan
const Op = db.Sequelize.Op

// Create and Save a new Loan
exports.create = (req, res) => {
  // Validate request
  if (!req.body.client || !req.body.group || !req.body.amount ||
     !req.body.interestRate || !req.body.startDate ||
     !req.body.status) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a Loan
  const loan = {
    guarantees: req.body.guarantees,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    amount: req.body.amount,
    interestRate: req.body.interestRate,
    dailyRental: req.body.dailyRental,
    arreas: req.body.arreas,
    status: req.body.status,
    files: req.body.files,
    images: req.body.images,
    isActive: req.body.isActive ? req.body.isActive : true,
    client: req.body.client,
    paymentPeriod: req.body.paymentPeriod,
    group: req.body.group
  }

  // Save Loan in the database
  Loan.create(loan)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Loan.'
      })
    })
}

// Retrieve all Loans from the database.
exports.findAll = (req, res) => {
  const client = req.query.client
  const condition = client
    ? {
        fullName: {
          [Op.like]: `%${client}%`
        }
      }
    : null

  Loan.findAll({ where: condition, order: Loan.sequelize.literal('createdAt DESC') })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Loans.'
      })
    })
}

// Find a single Loan with an id
exports.findOne = (req, res) => {
  const lid = req.params.id

  Loan.findByPk(lid)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Loan with id=${lid}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Loan with id=' + lid + ' ' + err
      })
    })
}

// Update a Loan by the id in the request
exports.update = (req, res) => {
  const lid = req.params.id

  Loan.update(req.body, {
    where: { lid }
  })
    .then(num => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.send({
          message: 'Loan was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Loan with id=${lid}. Maybe Loan was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Loan with id=' + lid + ' ' + err
      })
    })
}

// Delete a Loan with the specified id in the request
exports.delete = (req, res) => {
  const lid = req.params.id

  Loan.destroy({
    where: { lid }
  })
    .then(num => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.send({
          message: 'Loan was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Loan with id=${lid}. Maybe Loan was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Loan with id=' + lid + ' ' + err
      })
    })
}

// Delete all Loans from the database.
exports.deleteAll = (req, res) => {
  Loan.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Loans were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Loans.'
      })
    })
}

// Find all active Loans
exports.findAllActive = (req, res) => {
  Loan.findAll({ where: { isActive: true } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Loans.'
      })
    })
}
