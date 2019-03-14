"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  name: String,
  email: String,
  password: String,
  beersTaken: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Beer'
  }]
});

var _default = _mongoose.default.model('User', userSchema);

exports.default = _default;