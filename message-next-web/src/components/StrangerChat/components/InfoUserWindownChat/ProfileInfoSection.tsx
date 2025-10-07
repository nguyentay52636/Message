import React from 'react'
import { Mail, MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { userProfile } from './mockProfile'
import CollapsibleSection from './CollapsibleSection'

interface ProfileInfoSectionProps {
    isExpanded: boolean
    onToggle: () => void
}

export default function ProfileInfoSection({ isExpanded, onToggle }: ProfileInfoSectionProps) {
    const profileIcon = (
        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-xs">👤</span>
        </div>
    )

    return (
        <CollapsibleSection
            title="Thông tin cá nhân"
            icon={profileIcon}
            isExpanded={isExpanded}
            onToggle={onToggle}
        >
            <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Tham gia {userProfile.joinDate}</span>
                </div>
                <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Giới thiệu:</p>
                    <p>{userProfile.bio}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Sở thích:</p>
                    <div className="flex flex-wrap gap-1">
                        {userProfile.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {interest}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Kỹ năng:</p>
                    <div className="flex flex-wrap gap-1">
                        {userProfile.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </CollapsibleSection>
    )
}
