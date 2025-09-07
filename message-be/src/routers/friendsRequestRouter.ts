import express from "express";
import { addFriendRequest, getAllRequestFriends, acceptFriendRequest, deleteFriendRequest, searchUsersByPhone, getAllRequestFriend, rejectFriendRequest, getFriendsByUserId  } from "../controllers/friendsRequestController";
const Router = express.Router();

Router.post("/", addFriendRequest);
Router.get("/search", searchUsersByPhone);
Router.get("/user/:id", getAllRequestFriend);
Router.get("/:id", getAllRequestFriends);
Router.put("/accept/:id", acceptFriendRequest);
Router.put("/reject/:id", rejectFriendRequest);
Router.delete("/:id", deleteFriendRequest);
Router.get("/user-friends/:id", getFriendsByUserId);


export default Router; 
