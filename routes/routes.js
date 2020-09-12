const express = require('express')
const router = express.Router()

const values = require('../logic/values.json')

router.get('/showCaguamaPrice', function (req, res) {
    res.send(values.caguamonLight);
})

module.exports = router