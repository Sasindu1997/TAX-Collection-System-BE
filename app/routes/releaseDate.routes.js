module.exports = app => {
  const releaseDate = require('../controllers/releaseDate.controller.js')

  const router = require('express').Router()

  // Create a new releaseDate
  router.post('/', releaseDate.create)

  // Retrieve all releaseDates
  router.get('/', releaseDate.findAll)

  // Retrieve all published releaseDates
  router.get('/findAllActive', releaseDate.findAllActive)

  // Retrieve a single releaseDate with id
  router.get('/:id', releaseDate.findOne)

  // // Update a releaseDate with id
  router.put('/:id', releaseDate.update)

  // // Delete a releaseDate with id
  router.delete('/:id', releaseDate.delete)

  // Delete all releaseDates
  router.delete('/', releaseDate.deleteAll)

  app.use('/api/releaseDate', router)
}
