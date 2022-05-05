"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthRoutes = getAuthRoutes;

var _client = require("@prisma/client");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prisma = new _client.PrismaClient();

function getAuthRoutes() {
  const router = _express.default.Router();

  router.post("/signup", signup);
  router.post("/login", login);
  router.get("/signout", signout);
  return router;
}

async function getUniqueUser(email) {
  return await prisma.user.findUnique({
    where: {
      email
    }
  });
}

async function signup(req, res) {
  const {
    name,
    email,
    password
  } = req.body;
  let user = await getUniqueUser(email);

  if (user) {
    res.status(401).send('Invalid email!');
    return;
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password: _bcryptjs.default.hashSync(password, 8)
    }
  });
  res.status(200).send('Successfully created!');
} // All controllers/utility functions here


async function login(req, res) {
  const {
    email,
    password
  } = req.body;
  let user = await getUniqueUser(email);

  if (!user) {
    res.status(401).send('Please sign up first!');
  }

  const correctPassword = _bcryptjs.default.compareSync(password, user.password);

  if (user && correctPassword) {
    const tokenPayload = {
      id: user.id
    };

    const token = _jsonwebtoken.default.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    res.cookie('token', token, {
      httpOnly: true
    });
    res.status(200).send(token);
  }
}

function signout(req, res) {
  res.clearCookie("token");
  res.status(200).json('Log out successfully!');
}