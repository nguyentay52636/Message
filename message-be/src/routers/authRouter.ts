import express from "express";
import { login, signUp, verifyOTP, resendOTP } from "../controllers/authController";

const Router = express.Router();

Router.post("/login", login);
Router.post("/register", signUp);
Router.post("/verify-otp", verifyOTP);
Router.post("/resend-otp", resendOTP);

export default Router;