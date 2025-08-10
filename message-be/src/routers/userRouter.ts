import express from "express";
import { getUser } from "../controllers/userController";

const Router = express.Router();

    Router.get("/", getUser);

export default Router;  