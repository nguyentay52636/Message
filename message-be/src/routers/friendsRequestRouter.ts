import express from "express";
import { addFriendRequest, getAllRequestFriends, acceptFriendRequest, deleteFriendRequest, searchUsersByPhone } from "../controllers/friendsRequestController";
const Router = express.Router();

Router.post("/", addFriendRequest);
Router.get("/search", searchUsersByPhone);
Router.get("/:id", getAllRequestFriends);
Router.put("/:id", acceptFriendRequest);
Router.delete("/:id", deleteFriendRequest);

export default Router; 