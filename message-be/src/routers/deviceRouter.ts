import express from "express";
import {
  addOrUpdateDevice,
  getUserDeviceById,
  checkLoginDevice,
  removeDevice,
} from "../controllers/deviceController";

const Router = express.Router();
Router.post("/add-or-update-device/:userId", addOrUpdateDevice);
Router.get("/get-user-device/:userId/:deviceId", getUserDeviceById);
Router.post("/check-login-device/:userId", checkLoginDevice);
Router.delete("/remove-device/:userId/:deviceId", removeDevice);

export default Router;
