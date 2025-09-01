"use client"
import React from 'react'
import { useState } from "react"
import { X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import UserProfileHeader from './UserProfileHeader'
import ProfileInfoSection from './ProfileInfoSection'
import MediaSection from './MediaSection'
import SecuritySettingsSection from './SecuritySettingsSection'

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
                {/* User Profile Header */}
                <UserProfileHeader user={user} />

                {/* Profile Information Section */}
                <ProfileInfoSection
                    isExpanded={expandedSections.profile}
                    onToggle={() => toggleSection("profile")}
                />

                {/* Quick Info */}
                <div className="p-4 bg-white border-b border-gray-200">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Danh sách nhạc hẹn</span>
                    </div>
                </div>

                {/* Media Sections */}
                <MediaSection
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                />

                {/* Security Settings Section */}
                <SecuritySettingsSection
                    isExpanded={expandedSections.security}
                    onToggle={() => toggleSection("security")}
                    settings={settings}
                    onSettingChange={handleSettingChange}
                />
            </div>
        </div>
    )
}
