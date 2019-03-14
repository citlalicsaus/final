"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = res => ({
  message
}) => {
  res.status(500).json({
    message
  });
};

exports.default = _default;