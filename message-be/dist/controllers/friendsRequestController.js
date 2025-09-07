"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriendsByUserId = exports.rejectFriendRequest = exports.getAllRequestFriend = exports.searchUsersByPhone = exports.deleteFriendRequest = exports.acceptFriendRequest = exports.getAllRequestFriends = exports.addFriendRequest = void 0;
const response_1 = require("../config/response");
const friendRequest_1 = __importDefault(require("../models/friendRequest"));
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = require("mongoose");
const isValidId = (id) => !!id && mongoose_1.Types.ObjectId.isValid(id);
const addFriendRequest = async (req, res) => {
    try {
        const { sender, receiver } = req.body;
        if (!isValidId(sender) || !isValidId(receiver))
            return (0, response_1.ResponseApi)(res, 400, null, "Sender and Receiver are required");
        if (sender === receiver)
            return (0, response_1.ResponseApi)(res, 400, null, "Không thể tự gửi lời mời kết bạn cho chính mình");
        const [s, r] = await Promise.all([
            user_1.default.findById(sender),
            user_1.default.findById(receiver),
        ]);
        if (!s || !r)
            return (0, response_1.ResponseApi)(res, 404, null, "User not found");
        const existing = await friendRequest_1.default.findOne({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender },
            ],
        });
        if (existing) {
            if (existing.status === "pending")
                return (0, response_1.ResponseApi)(res, 400, null, "Đã gửi lời mời trước đó");
            if (existing.status === "accepted")
                return (0, response_1.ResponseApi)(res, 400, null, "Đã là bạn bè rồi");
            await existing.deleteOne();
        }
        const request = await friendRequest_1.default.create({ sender, receiver });
        const populated = await request.populate([
            { path: "sender", select: "_id username email phone avatar status lastSeen createdAt updatedAt" },
            { path: "receiver", select: "_id username email phone avatar status lastSeen createdAt updatedAt" },
        ]);
        return (0, response_1.ResponseApi)(res, 201, populated, "Gửi lời mời kết bạn thành công");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, error.message);
    }
};
exports.addFriendRequest = addFriendRequest;
const getAllRequestFriends = async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id))
        return (0, response_1.ResponseApi)(res, 400, null, "Id is required");
    try {
        const data = await friendRequest_1.default.find({ receiver: id, status: "pending" })
            .populate({
            path: "sender",
            select: "_id username email phone avatar status lastSeen createdAt updatedAt",
        })
            .populate({
            path: "receiver",
            select: "_id username email phone avatar status lastSeen createdAt updatedAt",
        });
        return (0, response_1.ResponseApi)(res, 200, data, "Danh sách lời mời kết bạn");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, error.message);
    }
};
exports.getAllRequestFriends = getAllRequestFriends;
const acceptFriendRequest = async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id))
        return (0, response_1.ResponseApi)(res, 400, null, "Id is required");
    try {
        const request = await friendRequest_1.default.findByIdAndUpdate(id, { status: "accepted" }, { new: true })
            .populate({
            path: "sender",
            select: "_id username email phone avatar status lastSeen createdAt updatedAt",
        })
            .populate({
            path: "receiver",
            select: "_id username email phone avatar status lastSeen createdAt updatedAt",
        });
        if (!request)
            return (0, response_1.ResponseApi)(res, 404, null, "Request not found");
        return (0, response_1.ResponseApi)(res, 200, request, "Đã chấp nhận kết bạn");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, error.message);
    }
};
exports.acceptFriendRequest = acceptFriendRequest;
const deleteFriendRequest = async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id))
        return (0, response_1.ResponseApi)(res, 400, null, "Id is required");
    try {
        const data = await friendRequest_1.default.findByIdAndDelete(id);
        if (!data)
            return (0, response_1.ResponseApi)(res, 404, null, "Request not found");
        return (0, response_1.ResponseApi)(res, 200, data, "Đã hủy lời mời kết bạn");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, error.message);
    }
};
exports.deleteFriendRequest = deleteFriendRequest;
// 🔍 Tìm user theo phone / username / email
const searchUsersByPhone = async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword)
            return (0, response_1.ResponseApi)(res, 400, null, "keyword is required");
        const q = String(keyword).trim();
        const users = await user_1.default.find({
            $or: [
                { phone: new RegExp(q, "i") },
                { username: new RegExp(q, "i") },
                { email: new RegExp(q, "i") },
            ],
        })
            .select("_id username phone email avatar status lastSeen")
            .limit(20);
        return (0, response_1.ResponseApi)(res, 200, users, "Search users success");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, error.message);
    }
};
exports.searchUsersByPhone = searchUsersByPhone;
const getAllRequestFriend = async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id))
        return (0, response_1.ResponseApi)(res, 400, null, "Id is required");
    try {
        const data = await friendRequest_1.default.find({ receiver: id })
            .populate({
            path: "sender",
            select: "_id username email phone avatar status lastSeen createdAt updatedAt",
        })
            .populate({
            path: "receiver",
            select: "_id username email phone avatar status lastSeen createdAt updatedAt",
        });
        return (0, response_1.ResponseApi)(res, 200, data, "Danh sách lời mời kết bạn");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, error.message);
    }
};
exports.getAllRequestFriend = getAllRequestFriend;
const rejectFriendRequest = async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id))
        return (0, response_1.ResponseApi)(res, 400, null, "Id is required");
    try {
        const data = await friendRequest_1.default.findByIdAndDelete(id);
        if (!data)
            return (0, response_1.ResponseApi)(res, 404, null, "Request not found");
        return (0, response_1.ResponseApi)(res, 200, data, "Đã từ chối lời mời kết bạn");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, error.message);
    }
};
exports.rejectFriendRequest = rejectFriendRequest;
const getFriendsByUserId = async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id))
        return (0, response_1.ResponseApi)(res, 400, null, "Id is required");
    try {
        // Tìm tất cả friend requests đã được chấp nhận mà user này tham gia
        const friendRequests = await friendRequest_1.default.find({
            $or: [
                { sender: id, status: "accepted" },
                { receiver: id, status: "accepted" }
            ]
        })
            .populate('sender', 'username avatar status lastSeen')
            .populate('receiver', 'username avatar status lastSeen')
            .sort({ updatedAt: -1 });
        // Lọc ra danh sách bạn bè (loại bỏ user hiện tại)
        const friends = friendRequests.map(request => {
            const sender = request.sender;
            const receiver = request.receiver;
            if (sender._id.toString() === id) {
                return {
                    _id: receiver._id,
                    username: receiver.username,
                    avatar: receiver.avatar,
                    status: receiver.status,
                    lastSeen: receiver.lastSeen,
                    friendshipDate: request.updatedAt
                };
            }
            else {
                return {
                    _id: sender._id,
                    username: sender.username,
                    avatar: sender.avatar,
                    status: sender.status,
                    lastSeen: sender.lastSeen,
                    friendshipDate: request.updatedAt
                };
            }
        });
        return (0, response_1.ResponseApi)(res, 200, friends, "Danh sách bạn bè");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, error.message);
    }
};
exports.getFriendsByUserId = getFriendsByUserId;
//# sourceMappingURL=friendsRequestController.js.map