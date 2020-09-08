const path = require("path")
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
require('dotenv').config()
const app = express()

mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxztm.mongodb.net/Posts`,
{
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/images", express.static(path.join("backend/images")))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATH, PUT, DELETE, OPTIONS"
  )
  next()
})

app.use("/api/posts", postRoutes)
app.use("/api/user", userRoutes)

module.exports = app
