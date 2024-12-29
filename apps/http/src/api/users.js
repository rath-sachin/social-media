import { Router } from "express";
import { verifyToken } from "../jwt.js";
import prisma from "@repo/db";

export const router = Router();

router.get("/", async (req, res) => {
  const token = req.cookies.token;

  const payload = verifyToken(token);
  const sub = payload.sub;
  const user = await prisma.user.findUnique({
    where: { id: sub },
  });

  res.json(user);
});
