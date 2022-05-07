import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import express from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

function getAuthRoutes() {
  const router = express.Router();

  router.post("/signup", signup);

  router.post("/login", login);

  router.get("/signout", signout);

  return router;
}

async function getUniqueUser(email) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function signup(req, res) {

  const { name, email, password } = req.body;

  let user = await getUniqueUser(email);

  if (user) {
    res.status(400).send('Invalid email!')
    return
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: bcrypt.hashSync(password, 8),
    },
  });

  if (newUser) {
    res.status(200).send('Signp successfully!');
    return;
  } else {
    res.status(400).send('Something heppend!');
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  let user = await getUniqueUser(email);

  if (!user) {
    res.status(401).send('Please sign up first!')
  }

  let correctPassword;

  if (password) {
    correctPassword = bcrypt.compareSync(password, user.password);
  } else {
    res.status(401).send('Please provide a password!');
  }


  if (user && correctPassword) {
    const tokenPayload = { id: user.id }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    })

    if (!token) {
      res.status(401).send('There is an error with the token!');
      return
    }

    res.cookie('token', token, { httpOnly: true })
    res.status(200).send(token)
  }
}

function signout(req, res) {
  res.clearCookie("token");
  res.status(200).json('Log out successfully!');
}

export { getAuthRoutes };
