import { ResponseApi } from "../config/response";
import FriendRequest from "../models/friendRequest";
import { Request, Response } from "express";
export const addFriendRequest = async (req: Request, res: Response) => {

}
export const getAllRequestFriends = async (req: Request, res: Response) => {
    const {id} = req.params;
if(!id) return ResponseApi(res, 400, null, "Id is required");
try { 
const data = await FriendRequest.find({receiver: id});
return ResponseApi(res, 200, data, "Get all request friends");
}catch (error : any ) { 
    return  ResponseApi(res, 500, null, error.message);
}
}