import express, { Application } from "express";
import cors from "cors";
import rootRouter from "./routers/rootRouter";
import { swaggerSpec, swaggerUi, swaggerUiOptions } from "./swaggerdocs/swagger";
import { swaggerOptimization, swaggerRequestHandler, swaggerCompression } from "./middleware/swaggerMiddleware";
import connectDB from "./connection/monggodb";

const app: Application = express();

// Connect to MongoDB
connectDB();

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());

app.use(swaggerCompression);
app.use(swaggerRequestHandler);

app.use("/api", rootRouter);

app.use("/api-docs", swaggerOptimization, swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default app;
