"use client"
import { Button } from '@/components/ui/button';
import React from 'react';

export default function HeaderAreaChatUnFriends() {
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-100">
            <div className="flex items-center space-x-3">
                <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-200"
                />
                <div>
                    <div className="text-sm font-semibold text-gray-900">Pun</div>
                    <div className="text-xs text-gray-500">NGƯỜI LẠ</div>
                    <div className="text-xs text-gray-400">Không có nhóm chung</div>
                </div>
            </div>
            <div className="flex space-x-2">
                <Button className="px-3 py-1 text-xs text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition duration-150">
                    Gửi yêu cầu kết bạn tại đây
                </Button>
                <Button className="px-3 py-1 text-xs text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-150">
                    Gửi kết bạn
                </Button>
            </div>
        </div>
    );
}