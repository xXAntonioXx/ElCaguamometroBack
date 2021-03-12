require('dotenv').config();
const express = require('express')
const beerSetUp = require('./logic/scraping/caguamaSetUp');
const chalk = require("chalk");
const dbConfig = require('./database/dbConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

async function initializeDataBase(){
  await dbConfig.loadAllModelsIntoDB();
  if(process.env.CREATE_DB_ADMIN = 'true'){
    await dbConfig.createAdminUser();
  }
}

async function start(){
  //setup
  await beerSetUp.setBeerData();
  await initializeDataBase();
  
  //routes
  const CAGUAMAS = require('./routes/routes');
  const AUTH = require('./routes/login');
  
  app.use(bodyParser.json());
  app.use(cors());
  app.use('/Caguamas',CAGUAMAS)
  app.use('/Auth',AUTH);
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.listen(port, () => {
    console.log(chalk.green("Endpoint '/Caguamas/showCaguamaPrice' Running!"));
    console.log("Listening on port 3000");
  });
}

console.log("Initialiing");
start();