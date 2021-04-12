"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conversionalRateProvider = _interopRequireDefault(require("../provider/conversionalRateProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var conversionReqValidator = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var from = req.query.from;
    var to = req.query.to;
    var amount = req.query.amount;
    var result = yield (0, _conversionalRateProvider.default)();
    var keys = Object.keys(result);
    req.currentRates = result;

    try {
      validateCountry(from, keys);
      validateCountry(to, keys);

      if (isNaN(amount)) {
        throw new Error("Given value is not a number " + amount);
      }

      next();
    } catch (e) {
      res.status(416).send({
        error: e.message
      });
    }
  });

  return function conversionReqValidator(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function validateCountry(country, keys) {
  var isValid = keys.includes(country);

  if (!isValid) {
    throw new Error("Given " + country + " value is not valid");
  }

  return isValid;
}

var _default = conversionReqValidator;
exports.default = _default;