import axios from "axios";
import parser from "xml2json";

function getConversionRates() {
  //https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml
  return axios
    .get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml")
    .then((res) => {
      const json = JSON.parse(parser.toJson(res.data));
      const conversionObj = json["gesmes:Envelope"]["Cube"]["Cube"]["Cube"];
      return formatData(conversionObj);
    })
    .catch((err) => {
      return { error: "Couldn't fetch data" };
    });
}

function formatData(obj) {
  const result = {};
  result.EUR = 1;
  for (let i = 0; i < obj.length; i++) {
    const currency = obj[i].currency;
    const rate = obj[i].rate;
    result[currency] = rate;
  }
  return result;
}

export default getConversionRates;
