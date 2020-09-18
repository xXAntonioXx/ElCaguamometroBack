const express = require('express')
const beerSetUp = require('./logic/scraping/caguamaSetUp');
const app = express();
const port = 3000;

//setup
beerSetUp.setBeerData();

//routes
const CAGUAMAS = require('./routes/routes');

app.use('/Caguamas',CAGUAMAS)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});