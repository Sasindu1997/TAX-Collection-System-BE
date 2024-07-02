const express = require('express')
const cors = require('cors')

const app = express()

global.__basedir = __dirname

const corsOptions = {
  origin: 'http://localhost:8080'
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const db = require('./app/models')
db.sequelize.sync()
  .then(() => {
    console.log('Synced db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })

// simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome.' })
})

// routes
// require('./app/routes/turorial.routes')(app)
// require('./app/routes/category.routes')(app)
// require('./app/routes/customer.routes')(app)
// require('./app/routes/subCategory.routes')(app)
// require('./app/routes/user.routes')(app)
// require('./app/routes/upload.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
// eslint-disable-next-line no-unused-vars
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
