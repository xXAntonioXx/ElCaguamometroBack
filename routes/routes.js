const express = require('express')
const router = express.Router();
const authenticateJWT = require('../auth/authMiddleware');

const beersCatalogue = require('../logic/beerCatalogue.json');

router.get('/showCaguamaPrice', authenticateJWT.authenticateJWT, function (req, res) {
    let beers = beersCatalogue.beers;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(beers);
});

router.get('/showSpecificCaguamaPrice/:beerId', authenticateJWT.authenticateJWT, function (req, res) {
    const beerId = req.params.beerId;
    const specificBeer = beersCatalogue.beers.filter(beer => beer.id == beerId );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(specificBeer);
});

module.exports = router