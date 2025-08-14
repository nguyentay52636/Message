import express from "express";
import { addUser, deleteUser, getUser, updateUser, getUserById, searchUserByPhoneNumber } from "../controllers/userController";

const Router = express.Router();

    Router.get("/", getUser);
    Router.get("/:id", getUserById);
    Router.put("/:id", updateUser);
    Router.delete("/:id", deleteUser);
    Router.post("/", addUser);
    Router.get("/search/:phone", searchUserByPhoneNumber);

export default Router;  