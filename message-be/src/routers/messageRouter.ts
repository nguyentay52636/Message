import express from "express";
import { uploadImage, getMessages, createMessageHandler, createReplyMessage } from "../controllers/messsageController";

const Router = express.Router() ; 

Router.post("/uploadImage", uploadImage);
Router.get("/messages", getMessages);
Router.post("/sendMessage", createMessageHandler);
Router.post("/replyMessage", createReplyMessage);


export default Router;