import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function getAuthUser(req, res, next) {

  if (!req.headers.authorization) {
    return res.status(401).send('You need to be logged in');
  }

  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  req.user = user;
  next();
}
