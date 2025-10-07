import React from 'react'
import { Shield, Bell, Volume2, Clock, Eye, AlertTriangle, Trash2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import CollapsibleSection from './CollapsibleSection'

interface SecuritySettingsSectionProps {
    isExpanded: boolean
    onToggle: () => void
    settings: {
        hideConversation: boolean
        autoDeleteMessages: boolean
        notifications: boolean
        soundEnabled: boolean
    }
    onSettingChange: (setting: string, value: boolean) => void
}

export default function SecuritySettingsSection({
    isExpanded,
    onToggle,
    settings,
    onSettingChange
}: SecuritySettingsSectionProps) {
    const securityIcon = <Shield className="w-5 h-5 text-muted-foreground" />

    return (
        <CollapsibleSection
            title="Thiết lập bảo mật"
            icon={securityIcon}
            isExpanded={isExpanded}
            onToggle={onToggle}
        >
            <div className="space-y-4">
                {/* Notifications */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Thông báo</p>
                            <p className="text-xs text-gray-500">Bật thông báo tin nhắn</p>
                        </div>
                    </div>
                    <Switch
                        checked={settings.notifications}
                        onCheckedChange={(checked) => onSettingChange("notifications", checked)}
                    />
                </div>

                <Separator className="bg-gray-200" />

                {/* Sound */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Volume2 className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Âm thanh</p>
                            <p className="text-xs text-gray-500">Bật âm thanh thông báo</p>
                        </div>
                    </div>
                    <Switch
                        checked={settings.soundEnabled}
                        onCheckedChange={(checked) => onSettingChange("soundEnabled", checked)}
                    />
                </div>

                <Separator className="bg-gray-200" />

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
                        onCheckedChange={(checked) => onSettingChange("hideConversation", checked)}
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
        </CollapsibleSection>
    )
}
