"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserRoutes = getUserRoutes;

var _client = require("@prisma/client");

var _axios = _interopRequireDefault(require("axios"));

var _express = _interopRequireDefault(require("express"));

var _authorization = require("../middleware/authorization");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prisma = new _client.PrismaClient();
const BASE_URL = 'https://restcountries.com/v3.1';

function getUserRoutes() {
  const router = _express.default.Router();

  router.get("/search-all", _authorization.getAuthUser, searchCountries);
  router.get("/search-one", _authorization.getAuthUser, searchCountry);
  return router;
}

async function searchCountries(req, res, next) {
  if (!req.query.query) {
    res.status(400).send('Please enter a search query');
  }

  const name = req.query.query.toLowerCase();
  const response = await _axios.default.get(`${BASE_URL}/name/${name}`);
  res.status(200).json(response.data);
}

async function searchCountry(req, res, next) {
  if (!req.query.query) {
    res.status(400).send('Please enter a search query');
  }

  const requesCountry = req.query.query.toLowerCase();
  const {
    data
  } = await _axios.default.get(`${BASE_URL}/name/${requesCountry}`);
  let result = {};
  data.forEach(country => {
    let name = country.name.common.toLowerCase();

    if (name.includes(requesCountry)) {
      result = country;
      return;
    }
  });
  res.status(200).json(result);
}