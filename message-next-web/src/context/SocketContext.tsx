"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { selectAuth } from "@/redux/slices/authSlice";
import { selectSocket } from "@/redux/slices/socketSlice";
import {
    setSocket,
    setConnectionStatus,
    setOnlineUsers,
    addTypingUser,
    removeTypingUser,
    clearTypingUsers,
    setLoading,
    setError,
    clearError
} from "@/redux/slices/socketSlice";
import {
    addMessage,
    updateMessageRead,
    addConversation,
    updateConversation,
    setTyping,
    setOnlineUsers as setChatOnlineUsers
} from "@/redux/slices/chatSlice";
import { OngoingCall, SocketUser } from "@/types/CallType";
import { OnlineUser } from "@/redux/slices/socketSlice";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
    isSocketConnected: boolean;
    onlineUsers: OnlineUser[] | null;
    isLoading: boolean;
    joinConversation: (conversationId: string) => void;
    leaveConversation: (conversationId: string) => void;
    sendMessage: (messageData: any) => void;
    sendTyping: (conversationId: string, userId: string) => void;
    stopTyping: (conversationId: string, userId: string) => void;
    markAsRead: (conversationId: string, userId: string) => void;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const { user, isLoading: authLoading } = useAppSelector(selectAuth);
    const socketState = useAppSelector(selectSocket)
    const { socket, isConnected, onlineUsers, isLoading } = socketState;

    useEffect(() => {
        if (!authLoading) {
            console.log("Auth not loaded yet");
            return;
        }

        if (!user) {
            console.log("No user found, skipping socket connection");
            return;
        }

        console.log("Creating socket connection for user:", user._id);
        const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000");
        dispatch(setSocket(socketInstance));

        return () => {
            console.log("Cleaning up socket connection");
            socketInstance.close();
            dispatch(setSocket(null));
        }
    }, [user, authLoading, dispatch]);

    useEffect(() => {
        if (socket === null) {
            console.log("Socket is null, skipping event listeners");
            return;
        }

        console.log("Setting up socket event listeners");

        function onConnect() {
            console.log("Socket connected");
            dispatch(setConnectionStatus(true));
            dispatch(clearError());
        }

        function onDisconnect() {
            console.log("Socket disconnected");
            dispatch(setConnectionStatus(false));
        }

        function onGetUsers(users: SocketUser[]) {
            console.log("Received online users:", users);
            dispatch(setOnlineUsers(users));
            dispatch(setChatOnlineUsers(users.map(u => u.userId)));
        }

        function onReceiveMessage(messageData: any) {
            console.log("Received message:", messageData);
            dispatch(addMessage({
                id: messageData.messageId,
                content: messageData.content,
                sender: messageData.senderId,
                conversationId: messageData.conversationId,
                messageType: messageData.messageType || 'text',
                createdAt: new Date(messageData.timestamp),
                isRead: false,
                readBy: [],
                imageId: messageData.imageId,
                mediaUrl: messageData.mediaUrl
            }));
        }

        function onConversationUpdated(conversationData: any) {
            console.log("Conversation updated:", conversationData);
            dispatch(updateConversation({
                id: conversationData.conversationId,
                updates: {
                    lastMessage: conversationData.lastMessage,
                    lastUpdated: conversationData.lastUpdated
                }
            }));
        }

        function onMessagesRead(data: { conversationId: string; userId: string }) {
            console.log("Messages read:", data);
            dispatch(updateMessageRead(data));
        }

        function onTyping(data: { conversationId: string; userId: string }) {
            console.log("User typing:", data);
            dispatch(addTypingUser(data));
            dispatch(setTyping({ ...data, isTyping: true }));
        }

        function onStopTyping(data: { conversationId: string; userId: string }) {
            console.log("User stopped typing:", data);
            dispatch(removeTypingUser(data));
            dispatch(setTyping({ ...data, isTyping: false }));
        }

        if (socket.connected) {
            console.log("Socket already connected");
            onConnect();
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("getUsers", onGetUsers);
        socket.on("receiveMessage", onReceiveMessage);
        socket.on("conversationUpdated", onConversationUpdated);
        socket.on("messagesRead", onMessagesRead);
        socket.on("chat:typing", onTyping);
        socket.on("chat:stopTyping", onStopTyping);

        return () => {
            console.log("Cleaning up socket event listeners");
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("getUsers", onGetUsers);
            socket.off("receiveMessage", onReceiveMessage);
            socket.off("conversationUpdated", onConversationUpdated);
            socket.off("messagesRead", onMessagesRead);
            socket.off("chat:typing", onTyping);
            socket.off("chat:stopTyping", onStopTyping);
        }
    }, [socket, dispatch]);

    // Join chat when user is authenticated
    useEffect(() => {
        if (!socket || !isConnected || !user) {
            console.log("Cannot join chat - socket:", !!socket, "connected:", isConnected, "user:", !!user);
            return;
        }

        console.log("Joining chat for user:", user._id);
        socket.emit('chat:join', {
            userId: user._id,
            conversations: [] // You can pass current conversations here
        });
    }, [socket, isConnected, user]);

    const joinConversation = useCallback((conversationId: string) => {
        if (socket && isConnected) {
            console.log("Joining conversation:", conversationId);
            socket.emit('chat:joinConversation', { conversationId });
        }
    }, [socket, isConnected]);

    const leaveConversation = useCallback((conversationId: string) => {
        if (socket && isConnected) {
            console.log("Leaving conversation:", conversationId);
            socket.emit('chat:leaveConversation', { conversationId });
        }
    }, [socket, isConnected]);

    const sendMessage = useCallback((messageData: any) => {
        if (socket && isConnected) {
            console.log("Sending message:", messageData);
            socket.emit('chat:send', messageData);
        }
    }, [socket, isConnected]);

    const sendTyping = useCallback((conversationId: string, userId: string) => {
        if (socket && isConnected) {
            socket.emit('chat:typing', { conversationId, userId });
        }
    }, [socket, isConnected]);

    const stopTyping = useCallback((conversationId: string, userId: string) => {
        if (socket && isConnected) {
            socket.emit('chat:stopTyping', { conversationId, userId });
        }
    }, [socket, isConnected]);

    const markAsRead = useCallback((conversationId: string, userId: string) => {
        if (socket && isConnected) {
            socket.emit('chat:read', { conversationId, userId });
        }
    }, [socket, isConnected]);

    const contextValue = useMemo(() => ({
        socket,
        isSocketConnected: isConnected,
        onlineUsers,
        isLoading,
        joinConversation,
        leaveConversation,
        sendMessage,
        sendTyping,
        stopTyping,
        markAsRead
    }), [socket, isConnected, onlineUsers, isLoading, joinConversation, leaveConversation, sendMessage, sendTyping, stopTyping, markAsRead]);

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    )
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketContextProvider");
    }
    return context;
}