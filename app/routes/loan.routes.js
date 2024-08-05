module.exports = app => {
  const loan = require('../controllers/loan.controller.js')

  const router = require('express').Router()

  // Create a new loan
  router.post('/', loan.create)

  // Retrieve all loans
  router.get('/', loan.findAll)

  // Retrieve all published loans
  router.get('/findAllActive', loan.findAllActive)

  // Retrieve a single loan with id
  router.get('/:id', loan.findOne)

  // // Update a loan with id
  router.put('/:id', loan.update)

  // // Delete a loan with id
  router.delete('/:id', loan.delete)

  // Delete all loans
  router.delete('/', loan.deleteAll)

  app.use('/api/loan', router)
}
