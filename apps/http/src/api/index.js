import { Router } from "express";
import { router as usersRouter } from "./users.js";
import { SignupSchema, SigninSchema } from "../types.js";
import prisma from "@repo/db";
import { hash, comparePassword } from "../bcrypt.js";
import { genetateToken, verifyToken } from "../jwt.js";

export const router = Router();
router.use("/users", usersRouter);

router.post("/signup", async (req, res) => {
  const parsed = SignupSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten());

    return;
  }
  try {
    const hashedPassword = await hash(parsed.data.password);
    const user = await prisma.user.create({
      data: { ...parsed.data, password: hashedPassword },
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: "User already exists" });
    console.error(e);
  }
});

router.post("/signin", async (req, res) => {
  const parsed = SigninSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).send("Invalid username or password");
    return;
  }
  const user = await prisma.user.findUnique({
    where: { username: parsed.data.username },
    select: { password: true, id: true },
  });
  if (!user) {
    res.send("Invalid username or password");
    return;
  }

  const hashedPassword = await comparePassword(
    parsed.data.password,
    user.password
  );
  if (!hashedPassword) {
    res.send("Invalid username or password");
    return;
  }
  res.cookie("token", genetateToken(user.id), {
    httpOnly: true,
  });
  res.send("login Successful");
  console.log(genetateToken(user.id));
});
