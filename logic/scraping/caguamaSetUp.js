const cheerio = require("cheerio");
const request = require("request");
const beerCatalogue = require("../beerCatalogue.json");
const chalk = require("chalk");

const uriOptions = {
  method: "GET",
  url: "https://www.sixtogo.com.mx/cervezas.html",
};

let $;

function scrapeCaguamaValues() {
  console.log(chalk.yellow("Scrapping page..."))
  return new Promise((resolve,reject) => {
    request(uriOptions, (err, res, body) => {

      if (err){
        console.log(chalk.red("ERROR at scrapping page"))
        reject(err);
      }
  
      $ = cheerio.load(body);
      let listOfBeersScraped = $("ol").find("li");
      console.log(chalk.green("Page Scrapped!"));

      resolve(listOfBeersScraped);
    });
  });
}

function setBeerPrices(listOfBeersScraped){

  console.log(chalk.yellow("Setting Prices..."))
  let beers = beerCatalogue.beers;

  listOfBeersScraped.each(function (i, element) {

    let individualElement = $(element);

    beers.forEach((element) => {

      let beerName = element.beer;

      if(individualElement.text().includes(beerName) && element.price <= 0){

        let detailContainer = individualElement.find("span .price");
        let otherDetails = individualElement.find("div .additional-attributes-item").text()
        let cointainer = getBeerContainer(otherDetails);
        element.container = cointainer;

        let price = detailContainer.text().replace("$", "");
        element.price = price;

        let image = individualElement.find("img").attr("src");
        element.image = image;

        console.log(chalk.magenta(`${beerName} Ready`));

      }
    });
    
  });
  console.log(chalk.green("Beer Prices Ready!"))
}

function getBeerContainer(beerAttributes){
  let beerAttributesArray = beerAttributes.split(/\n/);
  let beerContainer = beerAttributesArray[2].replace(/\s*/,"").replace(/\s*$/,"");
  return beerContainer;
}

async function setBeerData(){
  let body = await scrapeCaguamaValues();
  setBeerPrices(body);
}

module.exports = {
  setBeerData : setBeerData
}