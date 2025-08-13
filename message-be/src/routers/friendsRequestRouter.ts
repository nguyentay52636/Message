import express from "express";
import { addFriendRequest, getAllRequestFriends } from "../controllers/friendsRequestController";
const Router = express.Router();

Router.post("/", addFriendRequest);
Router.get("/:id", getAllRequestFriends);

export default Router;