const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const cors = require('cors');
// app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// express, nodemon
// app.use('/api/v1/posts', (req, res, next) => {
//   res.json({
//     message: 200
//   });
// });

app.get('/api/v1/features', (req, res, next) => {
  const posts = req.body;
  res.status(201).json({
    message: 'Post added successfully'
  })
});

module.exports = app;
