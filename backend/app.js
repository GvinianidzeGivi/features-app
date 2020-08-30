const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const featuresRoutes = require('./routes/features');
const userRoutes = require('./routes/user');
const app = express();

require('dotenv').config()

mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxztm.mongodb.net/Features`,
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
);
res.setHeader(
  'Access-Control-Allow-Methods',
  'GET, POST, PATCH, PUT, DELETE, OPTIONS'
);
next();
});

app.use('/api/v1/features', featuresRoutes);
app.use('/api/v1/user', userRoutes);

module.exports = app;
