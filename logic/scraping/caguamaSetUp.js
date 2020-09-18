const cheerio = require("cheerio");
const request = require("request");
const beerCatalogue = require("../beerCatalogue.json");

const uriOptions = {
  method: "GET",
  url: "https://www.sixtogo.com.mx/cervezas.html",
};

let $;

function scrapeCaguamaValues() {
  return new Promise(resolve => {
    request(uriOptions, (err, res, body) => {
      if (err) return console.error(err);
  
      $ = cheerio.load(body);
      let listOfBeersScraped = $("ol").find("li");
  
      resolve(listOfBeersScraped);
    });
  });
}

function setBeerPrices(listOfBeersScraped){

  let beers = beerCatalogue.beers;

  listOfBeersScraped.each(function (i, element) {

    let individualElement = $(element);

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

async function setBeerData(){
  let body = await scrapeCaguamaValues();
  setBeerPrices(body);
}

module.exports = {
  setBeerData : setBeerData
}