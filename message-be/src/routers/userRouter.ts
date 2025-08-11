import express from "express";
import { addUser, deleteUser, getUser, updateUser, getUserById } from "../controllers/userController";

const Router = express.Router();

    Router.get("/", getUser);
    Router.get("/:id", getUserById);
    Router.patch    ("/:id", updateUser);
    Router.delete("/:id", deleteUser);
    Router.post("/", addUser);

export default Router;  