import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import friendsRequestRouter from "./friendsRequestRouter";
import conversationRouter from "./conversationRouter";
import messageRouter from "./messageRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/friendsRequest", friendsRequestRouter);
router.use("/conversations", conversationRouter);
router.use("/message", messageRouter);

export default router;
