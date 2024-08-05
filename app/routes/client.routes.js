module.exports = app => {
  const client = require('../controllers/client.controller.js')

  const router = require('express').Router()

  // Create a new client
  router.post('/', client.create)

  // Retrieve all clients
  router.get('/', client.findAll)

  // Retrieve all published clients
  router.get('/published', client.findAllActive)

  // Retrieve a single client with id
  router.get('/:id', client.findOne)

  // Retrieve a single client with id
  router.get('/phone/:phone', client.findAllByPhone)

  // // Update a client with id
  router.put('/:id', client.update)

  // // Delete a client with id
  router.delete('/:id', client.delete)

  // Delete all clients
  router.delete('/', client.deleteAll)

  app.use('/api/client', router)
}
