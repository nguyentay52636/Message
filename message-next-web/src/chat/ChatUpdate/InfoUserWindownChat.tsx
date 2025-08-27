"use client"
import React from 'react'


import { useState } from "react"
import {
    X,
    ChevronDown,
    ChevronRight,
    ImageIcon,
    FileText,
    Link,
    Shield,
    Clock,
    Eye,
    AlertTriangle,
    Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface StrangerChatInfoProps {
    user: {
        id: string
        name: string
        avatar: string
        isOnline?: boolean
    }
    onClose?: () => void
}

export default function InfoUserWindownChat({ user, onClose }: StrangerChatInfoProps) {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        photos: false,
        files: false,
        links: true, // Default expanded to show the GitHub link
        security: false,
    })

    const [settings, setSettings] = useState({
        hideConversation: false,
        autoDeleteMessages: false,
    })

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    const handleSettingChange = (setting: string, value: boolean) => {
        setSettings((prev) => ({
            ...prev,
            [setting]: value,
        }))
    }

    // Mock GitHub link data
    const mockLinks = [
        {
            id: "1",
            url: "https://github.com/nguyentay52636/",
            title: "nguyentay52636 - Overview",
            description: "nguyentay52636 has 30 repositories available. Follow their code on GitHub.",
            domain: "github.com",
            thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-s3nrW57zE6OLlhG3ItCv9c1hveWXWe.png",
            timestamp: "Hôm nay",
        },
    ]

    return (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <h2 className="text-lg font-semibold text-gray-900">Thông tin hội thoại</h2>
                <Button variant="ghost" size="sm" onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
                    <X className="w-5 h-5 text-gray-500" />
                </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
                {/* User Profile Section */}
                <div className="p-6 text-center bg-white border-b border-gray-200">
                    <div className="relative inline-block mb-4">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gray-300 text-gray-700 font-bold text-2xl">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-background rounded-full"></div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                            <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                            <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                                <span className="text-lg">✏️</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Quick Info */}
                <div className="p-4 bg-white border-b border-gray-200">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Danh sách nhạc hẹn</span>
                    </div>
                </div>

                {/* Media Sections */}
                <div className="space-y-0">
                    {/* Photos/Videos Section */}
                    <div className="bg-white border-b border-gray-200">
                        <button
                            onClick={() => toggleSection("photos")}
                            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <ImageIcon className="w-5 h-5 text-muted-foreground" />
                                <span className="font-medium text-gray-900">Ảnh/Video</span>
                            </div>
                            {expandedSections.photos ? (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                        </button>
                        {expandedSections.photos && (
                            <div className="px-4 pb-4 bg-gray-50">
                                <div className="text-center py-8 text-gray-500">
                                    <p className="text-sm">Chưa có Ảnh/Video được chia sẻ trong hội thoại này</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Files Section */}
                    <div className="bg-white border-b border-gray-200">
                        <button
                            onClick={() => toggleSection("files")}
                            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-muted-foreground" />
                                <span className="font-medium text-gray-900">File</span>
                            </div>
                            {expandedSections.files ? (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                        </button>
                        {expandedSections.files && (
                            <div className="px-4 pb-4 bg-gray-50">
                                <div className="text-center py-8 text-gray-500">
                                    <p className="text-sm">Chưa có File được chia sẻ trong hội thoại này</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Links Section */}
                    <div className="bg-white border-b border-gray-200">
                        <button
                            onClick={() => toggleSection("links")}
                            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Link className="w-5 h-5 text-muted-foreground" />
                                <span className="font-medium text-gray-900">Link</span>
                            </div>
                            {expandedSections.links ? (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                        </button>
                        {expandedSections.links && (
                            <div className="px-4 pb-4 bg-gray-50">
                                {mockLinks.map((link) => (
                                    <div key={link.id} className="mb-3">
                                        <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <img
                                                    src="/placeholder.svg?height=32&width=32&text=GH"
                                                    alt="GitHub"
                                                    className="w-6 h-6 rounded"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">{link.title}</h4>
                                                    <span className="text-xs text-gray-500 ml-2">{link.timestamp}</span>
                                                </div>
                                                <p className="text-xs text-gray-600 mb-1">{link.domain}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="text-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-white"
                                    >
                                        Xem tất cả
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Security Settings Section */}
                    <div className="bg-white border-b border-gray-200">
                        <button
                            onClick={() => toggleSection("security")}
                            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-muted-foreground" />
                                <span className="font-medium text-gray-900">Thiết lập bảo mật</span>
                            </div>
                            {expandedSections.security ? (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                        </button>
                        {expandedSections.security && (
                            <div className="px-4 pb-4 bg-gray-50 space-y-4">
                                {/* Auto Delete Messages */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Tin nhắn tự xóa</p>
                                            <p className="text-xs text-gray-500">Không bao giờ</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-gray-200" />

                                {/* Hide Conversation */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Eye className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-900">Ẩn trò chuyện</span>
                                    </div>
                                    <Switch
                                        checked={settings.hideConversation}
                                        onCheckedChange={(checked) => handleSettingChange("hideConversation", checked)}
                                    />
                                </div>

                                <Separator className="bg-gray-200" />

                                {/* Report */}
                                <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm font-medium text-orange-600">Báo xấu</span>
                                </button>

                                {/* Delete Conversation */}
                                <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                    <span className="text-sm font-medium text-red-600">Xóa lịch sử trò chuyện</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
