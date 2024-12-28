import prisma from "@repo/db";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { router as apiRouter } from "./api/index.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", apiRouter);

app.listen(process.env.PORT);
