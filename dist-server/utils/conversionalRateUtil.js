"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _xml2json = _interopRequireDefault(require("xml2json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getConversionRates() {
  //https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml
  return _axios.default.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml").then(res => {
    var json = JSON.parse(_xml2json.default.toJson(res.data));
    var conversionObj = json["gesmes:Envelope"]["Cube"]["Cube"]["Cube"];
    return formatData(conversionObj);
  }).catch(err => {
    return {
      error: "Couldn't fetch data"
    };
  });
}

function formatData(obj) {
  var result = {};
  result.EUR = 1;

  for (var i = 0; i < obj.length; i++) {
    var currency = obj[i].currency;
    var rate = obj[i].rate;
    result[currency] = rate;
  }

  return result;
}

var _default = getConversionRates;
exports.default = _default;