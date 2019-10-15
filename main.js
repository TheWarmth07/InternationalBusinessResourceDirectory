'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

function updateDatabase(data) {
  
}

app.use(bodyParser);
app.post('/steps.html', (res, req) => {
  res.render("steps");
});

module.exports.handler = serverless(app);