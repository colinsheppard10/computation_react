const keys = require('./keys');
var logger = require('./logs/logger');


// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
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
    await databaseConnect.insertOrUpdateStudySession(dbConnection, req.body.studySessionResults);
    var data = await databaseConnect.getData(dbConnection);
    logger.info(`inserted into DB ${new Date()}`);
    res.send(`${JSON.stringify(data)}`);
  } catch (err) {
    console.log(err);
    logger.info(err);
  }
});

app.post('/api/studysessionjess', async (req, res) => {
  logger.info(`recieved API post request ${new Date()}`);
  try {
    await databaseConnect.insertOrUpdateStudySessionJess(dbConnection, req.body.studySessionResults);
    var data = await databaseConnect.getDataJess(dbConnection);
    logger.info(`inserted into DB ${new Date()}`);
    res.send(`${JSON.stringify(data)}`);
  } catch (err) {
    console.log(err);
    logger.info(err);
  }
});

app.post('/api/user', async (req, res) => {
  logger.info(`recieved API post request ${new Date()}`);
  try {
    await databaseConnect.insertUser(dbConnection, req.body.user);
    logger.info(`inserted into DB ${new Date()}`);
    res.send({});
  } catch (err) {
    console.log(err);
    logger.info(err);
  }
});

app.get('/api/datajess', async (req, res) => {
  logger.info(`recieved Data get request ${new Date()}`);
  try {
    var data = await databaseConnect.getDataJess(dbConnection);
    logger.info(`retrieved data from DB ${new Date()}`);
    res.send(data);
  } catch (err) {
    console.log(err);
    logger.info(err);
  }
});

app.get('/api/random', async (req, res) => {
  logger.info(`recieved Data get request ${new Date()}`);
  try {
    var response =  await axios.get('http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=2&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5');
    res.send([response.data[0].word, response.data[1].word])
  } catch (err) {
    console.log(err);
    logger.info(err);
  }
});

app.listen(5000, async (err) => {
  dbConnection = await databaseConnect.getDBConnection();
  console.log('API endpoint listening on port 5000');
});
