"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friendsRequestController_1 = require("../controllers/friendsRequestController");
const Router = express_1.default.Router();
Router.post("/", friendsRequestController_1.addFriendRequest);
Router.get("/search", friendsRequestController_1.searchUsersByPhone);
Router.get("/user/:id", friendsRequestController_1.getAllRequestFriend);
Router.get("/:id", friendsRequestController_1.getAllRequestFriends);
Router.put("/accept/:id", friendsRequestController_1.acceptFriendRequest);
Router.put("/reject/:id", friendsRequestController_1.rejectFriendRequest);
Router.delete("/:id", friendsRequestController_1.deleteFriendRequest);
Router.get("/user-friends/:id", friendsRequestController_1.getFriendsByUserId);
exports.default = Router;
//# sourceMappingURL=friendsRequestRouter.js.map