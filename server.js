require('dotenv').config()
const socketIO = require('./webSocket')
const express = require('express')

const app = express()
app.use('/', express.static('public'))

const server = app.listen(process.env.PORT, () => {
  console.log('Servidor HTTP: ON')
})

socketIO(server)
