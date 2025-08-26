import { IConversation } from "@/types/types";
import baseApi from "./baseApi";

export const GetAllConversation = async () => { 
     
} 
export const getConversationOfUser = async (userId: string) => {   
     try { 
const {data} = await baseApi.get(`/conversations/${userId}`);
return data;
     }catch(error : any) { 
        throw new Error(error.message);
     }
} 
export  const addConversation = async (conversation: IConversation) => { 
    const {members, type, groupName, groupAvatar, groupAdmin, lastMessage, lastUpdated} = conversation;
    try { 
        const newConservation = {
            members,
            type,
            groupName,
            groupAvatar,
            groupAdmin,
            lastMessage,
            lastUpdated,
        }
        const {data} = await baseApi.post("/conversations", newConservation);
        if(data.success) { 
            return data.conversation;
        }
        throw new Error(data.message);
    }catch(error : any) { 
        throw new Error(error.message);
    }
}