import { Request, Response } from "express";
import Conversation from "../models/conversation";
import { ResponseApi } from "../config/response";
export const addConversation = async (req: Request, res: Response) => {
 try  { 
    const {members, type, groupName, groupAvatar, groupAdmin} = req.body;
    if(!members || !type) return ResponseApi(res, 400, null, "Members and type are required");
    const conversation = new Conversation({members, type, groupName, groupAvatar, groupAdmin});
    await conversation.save();
    return ResponseApi(res, 200, conversation, "Conversation created successfully");
 }catch(error: any) { 
    return ResponseApi(res, 500, null, error.message);
 }
}       