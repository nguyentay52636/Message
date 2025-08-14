import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import friendsRequestRouter from "./friendsRequestRouter";
import mongoose from "mongoose";

const router = Router();


router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/friendsRequest", friendsRequestRouter);

export default router;
