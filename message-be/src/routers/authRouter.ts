import express from "express";
import { login } from "../controllers/authController";
import { signUp } from "../controllers/authController";

const Router = express.Router();

Router.post("/login", login);
Router.post("/signup", signUp);

export default Router;