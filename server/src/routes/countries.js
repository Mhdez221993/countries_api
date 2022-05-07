import { PrismaClient } from "@prisma/client";
import axios from "axios";
import express from "express";
import { getAuthUser } from "../middleware/authorization";

const prisma = new PrismaClient();

const BASE_URL = 'https://restcountries.com/v3.1';

function getUserRoutes() {
  const router = express.Router();

  router.get("/search-all", getAuthUser, searchCountries);

  router.get("/search-one", getAuthUser, searchCountry);


  return router;
}

async function searchCountries(req, res, next) {
  if (!req.query.query) {
    res.status(400).send('Please enter a search query')
    return;
  }

  const name = req.query.query.toLowerCase();

  let response = [];

  try {
    response = await axios.get(`${BASE_URL}/name/${name}`);
  } catch (e) {
    console.log('Something gent wrong with the outer request!');
  }

  if (response.data) {
    res.status(200).json(response.data);
    return;
  } else {
    res.status(401).json('Something went wrong!');
  }
}

async function searchCountry(req, res, next) {

  if (!req.query.query) {
    res.status(400).send('Please enter a search query');
    return;
  }

  const requesCountry = req.query.query.toLowerCase();

  let response = [];

  try {
    response = await axios.get(`${BASE_URL}/name/${requesCountry}`);
  } catch (e) {
    console.log('Something gent wrong with the outer request!');
    return;
  }


  if (response.data) {
    let result = {};
    response.data.forEach(country => {
      let name = country.name.common.toLowerCase();
      if (name === requesCountry) {
        result = country;
        return;
      }
    });

    res.status(200).json(result);
    return;
  } else {
    res.status(401).send('Something went wrong!');
  }
}

export { getUserRoutes };
