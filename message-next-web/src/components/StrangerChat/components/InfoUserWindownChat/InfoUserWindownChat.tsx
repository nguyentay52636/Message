"use client"
import React, { useState } from "react"
import { X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import UserProfileHeader from "./UserProfileHeader"
import ProfileInfoSection from "./ProfileInfoSection"
import MediaSection from "./MediaSection"
import SecuritySettingsSection from "./SecuritySettingsSection"

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
        links: true,
        security: false,
        profile: true,
    })

    const [settings, setSettings] = useState({
        hideConversation: false,
        autoDeleteMessages: false,
        notifications: true,
        soundEnabled: true,
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

    return (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out shadow-[rgba(0,0,0,0.05)_-4px_0_6px_0]">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 bg-white/90 backdrop-blur-md">
                <h2 className="text-[15px] font-semibold text-gray-900">Thông tin hội thoại</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50/60">
                {/* User Profile */}
                <div className="p-4">
                    <UserProfileHeader user={user} />
                </div>

                {/* Profile Info */}
                <div className="bg-white rounded-xl shadow-sm mx-3 mb-3 overflow-hidden border border-gray-100">
                    <ProfileInfoSection
                        isExpanded={expandedSections.profile}
                        onToggle={() => toggleSection("profile")}
                    />
                </div>

                {/* Quick Info */}
                <div className="mx-3 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm p-4">
                    <div className="flex items-center gap-3 text-[13px] text-gray-600">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>Danh sách nhạc hẹn</span>
                    </div>
                </div>

                {/* Media Section */}
                <div className="mx-3 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <MediaSection expandedSections={expandedSections} toggleSection={toggleSection} />
                </div>

                {/* Security Settings */}
                <div className="mx-3 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <SecuritySettingsSection
                        isExpanded={expandedSections.security}
                        onToggle={() => toggleSection("security")}
                        settings={settings}
                        onSettingChange={handleSettingChange}
                    />
                </div>

                {/* Footer hint */}
                <div className="text-center text-xs text-gray-400 py-3">
                    © Zalo style UI – Thiết kế bởi Tay ✨
                </div>
            </div>
        </div>
    )
}
