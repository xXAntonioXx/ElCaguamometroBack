const express = require('express')
const beerSetUp = require('./logic/scraping/caguamaSetUp');
const chalk = require("chalk");
const app = express();
const port = 3000;

async function start(){
  //setup
  await beerSetUp.setBeerData();
  
  //routes
  const CAGUAMAS = require('./routes/routes');
  
  app.use('/Caguamas',CAGUAMAS)
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