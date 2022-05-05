import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import express from "express";

const prisma = new PrismaClient();

function getAuthRoutes() {
  const router = express.Router();

  router.post("/signup", signup);

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
    res.status(401).send('Invalid email!')
    return
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password: bcrypt.hashSync(password, 8),
    },
  });

  res.status(200).send('Successfully created!');
}

export { getAuthRoutes };
