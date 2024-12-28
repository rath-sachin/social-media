import { Router } from "express";
import { router as usersRouter } from "./users.js";

export const router = Router();
router.use("/users", usersRouter);
