import express from "express";
import { addConversation } from "../controllers/conversationController";

const Router= express.Router();

Router.post("/", addConversation);

export default Router;