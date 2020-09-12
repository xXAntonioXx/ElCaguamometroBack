const cheerio = require("cheerio");
const request = require("request");
const values = require("../values.json");

let uriOptions = {
  method: "GET",
  url: "https://www.sixtogo.com.mx/cervezas.html",
};

function setCaguamaValues() {
  request(uriOptions, (err, res, body) => {
    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let listItems = $("ol");
    let liItems = listItems.find("li");

    let precio = "0.00";
    liItems.each(function (i, element) {
      let individualElement = $(element);
      if (individualElement.text().includes("Tecate Light Caguamón 1.2 L")) {
        let detailContainer = individualElement.find("span .price");
        precio = detailContainer.text();
      }
    });
    let caguamonLightPrice = precio.replace("$", "");
    values.caguamonLight = caguamonLightPrice;
  });
}

module.exports = {
  setCaguamaValues:setCaguamaValues
}