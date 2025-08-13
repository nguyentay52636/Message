import { Request, Response } from "express";
import { ResponseApi } from "../config/response";
import User from "../models/user";
import bcrypt from "bcryptjs";

export const getUser = async (req: Request, res: Response) => {
try {
    const user = await User.find();
    return ResponseApi(res, 200, user, "Get user success");
} catch (error:any) {
    return ResponseApi(res, 500, null, "Get user failed");
}
};  
export const getUserById = async (req: Request, res: Response) => {
try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return ResponseApi(res, 404, null, "User not found");
    }
    if (user.status === "offline") {
        return ResponseApi(res, 404, null, "User not found");
    }
    return ResponseApi(res, 200, user, "Get user success");
}catch(error :any) { 
    return ResponseApi(res, 500, null, "Get user failed");
}
};
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, phone, password,} = req.body;

    try {
        const user = await User.findById(id);   
        if (!user) {
            return ResponseApi(res, 404, null, "User not found");
        }
 const updateUser = await User.findByIdAndUpdate(id, { username, email, phone, password,}, { new: true });  
 return ResponseApi(res, 200, updateUser, "Update user success");
    } catch (error:any) {
        return ResponseApi(res, 500, null, "Update user failed");
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return ResponseApi(res, 404, null, "User not found");
        }
        return ResponseApi(res, 200, null, "Delete user success");
    } catch (error:any) {
        return ResponseApi(res, 500, null, "Delete user failed");
    }
}   
export const addUser = async (req: Request, res: Response) => {
    const { username, email, phone, password,avatar,status,lastSeen} = req.body;
   
    if (!username || !email || !phone || !password || !avatar || !status || !lastSeen) {
        return ResponseApi(res, 400, null, "Missing required fields");
    }
    try {
        const checkEmailExits = await User.findOne({ email });
        if (checkEmailExits) {
            return ResponseApi(res, 400, null, "Email already exists");
        }
        const checkPhoneExits = await User.findOne({ phone });
        if (checkPhoneExits) {
            return ResponseApi(res, 400, null, "Phone already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 20);

        const newUser = new User({ username, email, phone, password: hashedPassword,
            avatar,
            status,
            lastSeen,
        });
        await newUser.save();
        return ResponseApi(res, 200, newUser, "Add user success");
    } catch (error:any) {
        return ResponseApi(res, 500, null, "Add user failed");
    }   

}
export const searchUserByPhoneNumber = async (req: Request, res: Response) => {
    const { phone } = req.params;
    try {
        const user = await User.findOne({ phone });
        if (!user) {
            return ResponseApi(res, 404, null, "User not found");
        }
        return ResponseApi(res, 200, user, "Search user by phone number success");
    }catch(error :any) { 
        return ResponseApi(res, 500, null, "Search user by phone number failed");
    }
}
