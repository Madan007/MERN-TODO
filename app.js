const express = require('express');
app = express();
const bodyParser = require('body-parser');

const controllers = require('./controllers');
const { appErrorResponse, routeNotFoundResponse } = require('./utils/httpUtil');

const { APP_CONSTANTS } = require('./common/constants');
const { API_URL, PORT = 3000, MONGO_URL } = APP_CONSTANTS;
const db = require('./utils/db');

app.use(bodyParser.json());
app.use(API_URL, controllers);

app.all('*', (req, res) => {
  return res.json(routeNotFoundResponse());
});

app.use((error, req, res, next) => {
  console.log('App Error..', error);
  return res.json(appErrorResponse(error));
});

process.on('uncaughtException', (error, info) => {
  // check the syntax
  console.log('uncaughtException---', error, info);
});

process.on('unhandledRejection', (error) => {
  // Check the Syntax
  console.log('unhandledRejection---', error);
});

// Connect to Mongo on start
db.connect(MONGO_URL, (error) => {
  if (error) {
    throw error;
  } else {
    app.listen(PORT, function () {
      console.log(`Listening on port ${PORT}...`);
    });
  }
});
