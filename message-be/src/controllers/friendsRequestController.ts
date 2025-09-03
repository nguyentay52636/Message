import { Request, Response } from "express";
import { ResponseApi } from "../config/response";
import FriendRequest from "../models/friendRequest";
import User from "../models/user";
import { Types } from "mongoose";

const isValidId = (id?: string) => !!id && Types.ObjectId.isValid(id);

export const addFriendRequest = async (req: Request, res: Response) => {
  try {
    const { sender, receiver } = req.body;
    if (!isValidId(sender) || !isValidId(receiver))
      return ResponseApi(res, 400, null, "Sender and Receiver are required");

    if (sender === receiver)
      return ResponseApi(res, 400, null, "Không thể tự gửi lời mời kết bạn cho chính mình");

    const [s, r] = await Promise.all([
      User.findById(sender),
      User.findById(receiver),
    ]);
    if (!s || !r) return ResponseApi(res, 404, null, "User not found");

    const existing = await FriendRequest.findOne({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });

    if (existing) {
      if (existing.status === "pending")
        return ResponseApi(res, 400, null, "Đã gửi lời mời trước đó");
      if (existing.status === "accepted")
        return ResponseApi(res, 400, null, "Đã là bạn bè rồi");
      await existing.deleteOne();
    }

    const request = await FriendRequest.create({ sender, receiver });
    return ResponseApi(res, 201, request, "Gửi lời mời kết bạn thành công");
  } catch (error: any) {
    return ResponseApi(res, 500, null, error.message);
  }
};

export const getAllRequestFriends = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) return ResponseApi(res, 400, null, "Id is required");

  try {
    const data = await FriendRequest.find({ receiver: id, status: "pending" })
      .populate("sender", "username avatar status lastSeen");

    return ResponseApi(res, 200, data, "Danh sách lời mời kết bạn");
  } catch (error: any) {
    return ResponseApi(res, 500, null, error.message);
  }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) return ResponseApi(res, 400, null, "Id is required");

  try {
    const request = await FriendRequest.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    ).populate("sender receiver", "username avatar");

    if (!request) return ResponseApi(res, 404, null, "Request not found");

    return ResponseApi(res, 200, request, "Đã chấp nhận kết bạn");
  } catch (error: any) {
    return ResponseApi(res, 500, null, error.message);
  }
};

export const deleteFriendRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) return ResponseApi(res, 400, null, "Id is required");

  try {
    const data = await FriendRequest.findByIdAndDelete(id);
    if (!data) return ResponseApi(res, 404, null, "Request not found");

    return ResponseApi(res, 200, data, "Đã hủy lời mời kết bạn");
  } catch (error: any) {
    return ResponseApi(res, 500, null, error.message);
  }
};

// 🔍 Tìm user theo phone / username / email
export const searchUsersByPhone = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query as { keyword?: string };
    if (!keyword) return ResponseApi(res, 400, null, "keyword is required");

    const q = String(keyword).trim();
    const users = await User.find({
      $or: [
        { phone: new RegExp(q, "i") },
        { username: new RegExp(q, "i") },
        { email: new RegExp(q, "i") },
      ],
    })
      .select("_id username phone email avatar status lastSeen")
      .limit(20);

    return ResponseApi(res, 200, users, "Search users success");
  } catch (error: any) {
    return ResponseApi(res, 500, null, error.message);
  }
};
export const getAllRequestFriend = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) return ResponseApi(res, 400, null, "Id is required");

  try {
    const data = await FriendRequest.find({ receiver: id });
    return ResponseApi(res, 200, data, "Danh sách lời mời kết bạn");
  } catch (error: any) {
    return ResponseApi(res, 500, null, error.message);
  }
};
export const rejectFriendRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) return ResponseApi(res, 400, null, "Id is required");

  try {
    const data = await FriendRequest.findByIdAndDelete(id);
    if (!data) return ResponseApi(res, 404, null, "Request not found");
    return ResponseApi(res, 200, data, "Đã từ chối lời mời kết bạn");
  } catch (error: any) {
    return ResponseApi(res, 500, null, error.message);
  }
};
export const getAllFriendByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) return ResponseApi(res, 400, null, "Id is required");

  try {
    const data = await FriendRequest.find({ receiver: id, status: "accepted" });
    return ResponseApi(res, 200, data, "Danh sách bạn bè");
  } catch (error: any) {
    return ResponseApi(res, 500, null, error.message);
  }
};