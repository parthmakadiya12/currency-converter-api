"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _convert = _interopRequireDefault(require("./routes/convert"));

var _convertionReqValidator = _interopRequireDefault(require("./middlewares/convertionReqValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, "../public")));
app.use("/", _index.default);
app.use("/convert", _convertionReqValidator.default, _convert.default);
app.use((error, req, res, next) => {
  return res.status(500).json({
    error: error.toString()
  });
});
var _default = app;
exports.default = _default;