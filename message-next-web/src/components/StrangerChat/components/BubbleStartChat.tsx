import { Button } from '@/components/ui/button'
import React from 'react'
import { Phone, Video, Search, MoreHorizontal } from 'lucide-react'
import { MessageCircle } from 'lucide-react'
interface BubbleStartChatProps {
    handleToggleChatBubble: () => void

}
export default function BubbleStartChat({ handleToggleChatBubble }: BubbleStartChatProps) {
    return (
        <div className="fixed bottom-24 right-6 z-50">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80 max-h-96 overflow-y-auto">
                {/* Bubble Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-sm text-gray-900">Chat với </span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleToggleChatBubble}
                        className="p-1 h-6 w-6 hover:bg-gray-100"
                    >
                        <span className="text-gray-500">×</span>
                    </Button>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={() => console.log("Start voice call")}
                    >
                        <Phone className="w-4 h-4" />
                        Gọi thoại
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={() => console.log("Start video call")}
                    >
                        <Video className="w-4 h-4" />
                        Gọi video
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={() => console.log("Search in chat")}
                    >
                        <Search className="w-4 h-4" />
                        Tìm kiếm
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={() => console.log("More options")}
                    >
                        <MoreHorizontal className="w-4 h-4" />
                        Tùy chọn khác
                    </Button>
                </div>

                {/* User Status */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span>Không hoạt động</span>
                    </div>
                </div>
            </div>
        </div>

    )
}
