module.exports = app => {
  const group = require('../controllers/group.controller.js')

  const router = require('express').Router()

  // Create a new group
  router.post('/', group.create)

  // Retrieve all groups
  router.get('/', group.findAll)

  // Retrieve all published groups
  router.get('/findAllActive', group.findAllActive)

  // Retrieve a single group with id
  router.get('/:id', group.findOne)

  // // Update a group with id
  router.put('/:id', group.update)

  // // Delete a group with id
  router.delete('/:id', group.delete)

  // Delete all groups
  router.delete('/', group.deleteAll)

  app.use('/api/group', router)
}
