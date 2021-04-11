"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();
/* GET convert get listing. */


router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var {
      from,
      to,
      amount
    } = req.query;
    var totalSum = calculate(from, to, amount, req.currentRates);
    var rate = calculate(from, to, 1, req.currentRates);
    res.status(200).send({
      amount: amount,
      from: from,
      to: to,
      total: totalSum,
      rate: rate,
      date: new Date()
    });
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

function calculate(from, to, amt, currentRates) {
  var result;

  if (from === "EUR") {
    result = amt * currentRates[to];
  } else if (to === "EUR") {
    result = amt / currentRates[from];
  } else {
    result = amt * (currentRates[to] / currentRates[from]);
  }

  return result;
}

var _default = router;
exports.default = _default;