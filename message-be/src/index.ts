import express, { Application } from "express";
import cors from "cors";
import rootRouter from "./routers/rootRouter";
import { swaggerSpec, swaggerUi } from "./swaggerdocs/swagger";

const app: Application = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use("/api", rootRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
