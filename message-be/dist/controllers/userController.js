"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUserByPhoneNumber = exports.addUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUser = void 0;
const response_1 = require("../config/response");
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUser = async (req, res) => {
    try {
        const users = await user_1.default.find();
        return (0, response_1.ResponseApi)(res, 200, users, "Get user success");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Get user failed: ${error.message}`);
    }
};
exports.getUser = getUser;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user_1.default.findById(id);
        if (!user) {
            return (0, response_1.ResponseApi)(res, 404, null, "User not found");
        }
        if (user.status === "offline") {
            return (0, response_1.ResponseApi)(res, 404, null, "User not found");
        }
        return (0, response_1.ResponseApi)(res, 200, user, "Get user success");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, "Get user failed");
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, phone, password, avatar, status } = req.body;
    try {
        const user = await user_1.default.findById(id);
        if (!user) {
            return (0, response_1.ResponseApi)(res, 404, null, "User not found");
        }
        const updateUser = await user_1.default.findByIdAndUpdate(id, { username, email, phone, password, avatar, status }, { new: true });
        return (0, response_1.ResponseApi)(res, 200, updateUser, "Update user success");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, "Update user failed");
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await user_1.default.findByIdAndDelete(id);
        if (!user) {
            return (0, response_1.ResponseApi)(res, 404, null, "User not found");
        }
        return (0, response_1.ResponseApi)(res, 200, user, "Delete user success");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, "Delete user failed");
    }
};
exports.deleteUser = deleteUser;
const addUser = async (req, res) => {
    const { username, email, phone, password, avatar, status } = req.body;
    if (!username || !email || !phone || !password || !avatar || !status) {
        return (0, response_1.ResponseApi)(res, 400, null, "Missing required fields");
    }
    try {
        const checkEmailExits = await user_1.default.findOne({ email });
        if (checkEmailExits) {
            return (0, response_1.ResponseApi)(res, 400, null, "Email already exists");
        }
        const checkPhoneExits = await user_1.default.findOne({ phone });
        if (checkPhoneExits) {
            return (0, response_1.ResponseApi)(res, 400, null, "Phone already exists");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 20);
        const newUser = new user_1.default({
            username,
            email,
            phone,
            password: hashedPassword,
            avatar,
            status
        });
        await newUser.save();
        return (0, response_1.ResponseApi)(res, 200, newUser, "Add user success");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, "Add user failed");
    }
};
exports.addUser = addUser;
const searchUserByPhoneNumber = async (req, res) => {
    const { phone } = req.params;
    try {
        const user = await user_1.default.findOne({ phone });
        if (!user) {
            return (0, response_1.ResponseApi)(res, 404, null, "User not found");
        }
        return (0, response_1.ResponseApi)(res, 200, user, "Search user by phone number success");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, "Search user by phone number failed");
    }
};
exports.searchUserByPhoneNumber = searchUserByPhoneNumber;
//# sourceMappingURL=userController.js.map