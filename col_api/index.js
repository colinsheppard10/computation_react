const keys = require('./keys');
var logger = require('./logs/logger');


// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB Connection
var databaseConnect = require('./database_connect');
var dbConnection = null;

// Express route handlers
app.get('/api/data', async (req, res) => {
  logger.info(`recieved Data get request ${new Date()}`);
  try {
    // res.send('ok');
    var data = await databaseConnect.getData(dbConnection);
    logger.info(`retrieved data from DB ${new Date()}`);
    res.send(data);
  } catch (err) {
    console.log(err);
    logger.info(err);
  }
});

app.post('/api/insert', async (req, res) => {
  logger.info(`recieved API post request ${new Date()}`);
  try {
    // res.send('ok');
    var data = await databaseConnect.insertDate(dbConnection, req.body.computationResults, req.body.randomResults);
    logger.info(`inserted into DB ${new Date()}`);
    res.send(`${JSON.stringify(data)}`);
  } catch (err) {
    console.log(err);
    logger.info(err);
  }
});

app.post('/api/studysession', async (req, res) => {
  logger.info(`recieved API post request ${new Date()}`);
  try {
    var data = await databaseConnect.insertOrUpdateStudySession(dbConnection, req.body.studySessionResults);
    logger.info(`inserted into DB ${new Date()}`);
    res.send(`${JSON.stringify(data)}`);
  } catch (err) {
    console.log(err);
    logger.info(err);
  }
});

app.listen(5000, async (err) => {
  dbConnection = await databaseConnect.getDBConnection();
  console.log('API endpoint listening on port 5000');
});
