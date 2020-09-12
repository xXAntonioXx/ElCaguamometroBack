const cheerio = require("cheerio");
const request = require("request");
const beerPrices = require("../beerPrices.json");
const beerCatalogue = require("../beerCatalogue.json");

const uriOptions = {
  method: "GET",
  url: "https://www.sixtogo.com.mx/cervezas.html",
};

function setCaguamaValues() {
  request(uriOptions, (err, res, body) => {
    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let listOfBeersScraped = $("ol").find("li");

    let precio = "0.00";
  });
}

function setBeerPrices(listOfBeersScraped){

  let beers = beerCatalogue.beers;

  listOfBeersScraped.each(function (i, element) {

    let individualElement = $(element).text();

    beers.forEach((element) => {

      let beerName = element.beer;

      if(individualElement.text().includes(beerName)){

        let detailContainer = individualElement.find("span .price");
        let price = detailContainer.text().replace("$", "");
        element.price = price;

      }
    });
    
  });
}

module.exports = {
  setCaguamaValues:setCaguamaValues
}