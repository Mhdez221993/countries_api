import { PrismaClient } from "@prisma/client";
import axios from "axios";
import express from "express";
import { getAuthUser } from "../middleware/authorization";

const prisma = new PrismaClient();

const BASE_URL = 'https://restcountries.com/v3.1';

function getUserRoutes() {
  const router = express.Router();

  router.get("/search-one", getAuthUser, searchCountry);


  return router;
}

async function searchCountry(req, res, next) {
  if (!req.query.query) {
    res.status(400).send('Please enter a search query')
  }

  const requesCountry = req.query.query.toLowerCase();

  const { data } = await axios.get(`${BASE_URL}/name/${requesCountry}`);

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

export { getUserRoutes };
