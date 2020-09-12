const express = require('express')
const router = express.Router();

const beersCatalogue = require('../logic/beerCatalogue.json');

router.get('/showCaguamaPrice', function (req, res) {
    let beers = beersCatalogue.beers;
    res.json(beers);
});

module.exports = router