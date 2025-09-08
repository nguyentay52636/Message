import React from 'react'
import {
    Card,

} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Phone, MessageSquare, Share2, Ban, Users, X, Edit3 } from "lucide-react";
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/slices/authSlice';
import { ScrollArea } from "@/components/ui/scroll-area";

interface InformationAccountProps {
    isOpen: boolean;
    onClose: (value: boolean) => void;
}


export default function InformationAccount({ isOpen, onClose }: InformationAccountProps) {
    const { user } = useSelector(selectAuth)

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-white/50 backdrop-blur-sm"
                onClick={() => onClose(true)}
            />
            <div className="relative z-10 w-full max-w-2xl mx-4 max-h-[90vh]">
                <Card className="overflow-hidden rounded-2xl shadow-2xl bg-white h-full flex flex-col">
                    {/* Fixed Header */}
                    <div className="relative flex-shrink-0">
                        <div className="absolute top-4 right-4 z-10">
                            <Button

                                size="sm"
                                onClick={() => onClose(false)}
                                className="h-8 w-8 p-0 hover:text-white cursor-pointer rounded-full bg-black/20 hover:bg-black/30 text-white"
                            >
                                <X size={16} />
                            </Button>
                        </div>

                        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="cover"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/70">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🏞️</div>
                                        <div className="text-sm">No Cover Photo</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Avatar overlay */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                                <AvatarImage src={user?.avatar} alt={user?.username} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-2xl">
                                    {user?.username?.charAt(0) || "👤"}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <ScrollArea className="flex-1">
                        <div className="pt-16 pb-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <h2 className="text-xl font-semibold text-center">
                                    {user?.username || "Nguyen 10tr 1PN q3 BC thang..."}
                                </h2>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <Edit3 size={14} />
                                </Button>
                            </div>

                            {/* Action buttons */}
                            <div className="flex justify-center gap-3 my-6 px-6">
                                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2 h-10 cursor-pointer">
                                    <Phone size={18} /> Gọi điện
                                </Button>
                                <Button className="flex-1 flex items-center justify-center gap-2 h-10 bg-blue-500 hover:bg-blue-600 cursor-pointer">
                                    <MessageSquare size={18} /> Nhắn tin
                                </Button>
                            </div>

                            {/* Personal information */}
                            <div className="px-6 space-y-3">
                                <h3 className="font-semibold text-gray-800">Thông tin cá nhân</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Giới tính:</span>
                                        <span className="text-gray-800">{user?.status || "Nữ"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Ngày sinh:</span>
                                        <span className="text-gray-800">{user?.createdAt || "••/••/••••"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Điện thoại:</span>
                                        <span className="text-gray-800">{user?.phone || "••••••••••"}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Images section */}
                            <div className="px-6 py-3">
                                <div className="text-sm text-gray-600">
                                    Chưa có ảnh nào được chia sẻ
                                </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Footer actions */}
                            <div className="px-6 space-y-3">
                                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Users size={16} className="text-gray-600" />
                                    </div>
                                    <span className="text-sm text-gray-800">Nhóm chung (0)</span>
                                </div>

                                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Share2 size={16} className="text-gray-600" />
                                    </div>
                                    <span className="text-sm text-gray-800">Chia sẻ danh thiếp</span>
                                </div>

                                <div className="flex items-center gap-3 cursor-pointer hover:bg-red-50 p-2 rounded-lg transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                        <Ban size={16} className="text-red-600" />
                                    </div>
                                    <span className="text-sm text-red-600">Chặn tin nhắn và cuộc gọi</span>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </Card>
            </div>

        </div >
    )
}



