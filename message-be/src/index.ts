import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import rootRouter from "./routers/rootRouter";
import { swaggerSpec, swaggerUi, swaggerUiOptions } from "./swaggerdocs/swagger";
import { swaggerOptimization, swaggerRequestHandler, swaggerCompression } from "./middleware/swaggerMiddleware";
import connectDB from "./connection/monggodb";

const app: Application = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(express.json());

app.use(swaggerCompression);
app.use(swaggerRequestHandler);

app.use("/api", rootRouter);

app.use("/api-docs", swaggerOptimization, swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default app;
