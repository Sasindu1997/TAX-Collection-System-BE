module.exports = app => {
  const users = require('../controllers/user.controller.js')

  const router = require('express').Router()

  // Create a new User
  router.post('/', users.create)

  // Retrieve all Users
  router.get('/', users.findAll)

  // Retrieve all published Users
  router.get('/published', users.findAllPublished)

  // Retrieve a single User with id
  router.get('/:uid', users.findOne)

  // Retrieve a single User with phone
  router.get('/phone/:phoneNumber', users.findAllByPhone)

  // Retrieve a single User with nic
  router.get('/nic/:nic', users.findAllByNic)

  // Retrieve a single User with nic
  router.get('/type/:type', users.findAllByType)

  // // Update a User with id
  router.put('/:uid', users.update)

  // // Delete a User with id
  router.delete('/:uid', users.delete)

  // Delete all Users
  router.delete('/', users.deleteAll)

  app.use('/api/user', router)
}
