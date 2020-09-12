const express = require('express')
const app = express()
const port = 3000

//routes
const CAGUAMAS = require('./routes/routes');

app.use('/Caguamas',CAGUAMAS)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})