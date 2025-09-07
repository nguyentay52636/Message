"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const Router = express_1.default.Router();
Router.get("/", userController_1.getUser);
Router.get("/:id", userController_1.getUserById);
Router.put("/:id", userController_1.updateUser);
Router.delete("/:id", userController_1.deleteUser);
Router.post("/", userController_1.addUser);
Router.get("/search/:phone", userController_1.searchUserByPhoneNumber);
exports.default = Router;
//# sourceMappingURL=userRouter.js.map