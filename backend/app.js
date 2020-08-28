const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()


const Feature = require('./models/features');

const app = express();

mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxztm.mongodb.net/Features?retryWrites=true&w=majority`,
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

// const cors = require('cors');
// app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/v1/features', (req, res, next) => {
  const feature = new Feature({
    title: req.body.title,
  });
  feature.save().then(createdFeature => {
    res.status(201).json({
      message: 'Feature added successfully',
      featureId: createdFeature._id
    });
  });
});

app.put('/api/v1/features/:id', (req, res, next) => {
  const feature = new Feature({
    title: req.body.title,
  });
  Feature.updateOne({ _id: req.params.id }, feature).then(result => {
    res.status(200).json({ message: 'Update successful!' });
  });
});

app.get('/api/v1/features', (req, res, next) => {
  Feature.find().then(documents => {
    res.status(200).json({
      message: 'Features fetched successfully!',
      features: documents
    });
  });
});

app.get('/api/v1/features/:id', (req, res, next) => {
  Feature.findById(req.params.id).then(feature => {
    if (feature) {
      res.status(200).json(feature);
    } else {
      res.status(404).json({ message: 'Feature not found!' });
    }
  });
});

app.delete('/api/v1/features/:id', (req, res, next) => {
  Feature.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Feature deleted!' });
  });
});


module.exports = app;
