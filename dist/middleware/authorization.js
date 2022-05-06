"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthUser = getAuthUser;

var _client = require("@prisma/client");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prisma = new _client.PrismaClient();

async function getAuthUser(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('You need to be logged in');
  }

  const token = req.headers.authorization;

  const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id
    }
  });
  req.user = user;
  next();
}