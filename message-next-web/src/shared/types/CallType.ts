import { IUser } from "./types";

export interface SocketUser { 
    userId : string;
    socketId : string;
    profile : IUser;
 }
export interface OngoingCall  { 
    partcipants : Participants;
    createdAt : Date;
    updatedAt : Date;
}
export interface Participants { 
    caller : SocketUser;
    receiver : SocketUser;
}