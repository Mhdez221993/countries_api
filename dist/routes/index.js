"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoutes = getRoutes;

var _express = _interopRequireDefault(require("express"));

var _auth = require("./auth");

var _countries = require("./countries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRoutes() {
  const router = _express.default.Router(); // router.use() prefixes our route (i.e. /api/v1/auth)


  router.use("/auth", (0, _auth.getAuthRoutes)());
  router.use("/countries", (0, _countries.getUserRoutes)());
  return router;
}