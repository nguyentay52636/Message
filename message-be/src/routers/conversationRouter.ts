import express from "express";
import { addConversation, addMemberToConversation, deleteConversation, getConversationOfUser,     updateConversation } from "../controllers/conversationController";

const Router= express.Router();

Router.post("/", addConversation);
Router.get("/", getConversationOfUser);
Router.get("/:userId", getConversationOfUser);
Router.put("/:conversationId", updateConversation);
Router.delete("/:conversationId", deleteConversation);
Router.post("/addMember", addMemberToConversation);

export default Router;