"use client";
import React, { useState } from 'react'
import ProfileHeader from '@/components/profile/components/HeaderProfile/HeaderProfile'
import { profileData, userPhotos, currentUser } from '@/components/profile/mock/data'
import { ImageSelectionModal } from '@/components/profile/components/ImageSelectionModal'
import CoverPhoto from '@/components/profile/components/Photo/CoverPhoto';
export default function page() {
    const [showChatBubble, setShowChatBubble] = useState(false)
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const [showImageSelector, setShowImageSelector] = useState<"cover" | "avatar" | null>(null)

    return (
        <div className="min-h-screen bg-background">
            <CoverPhoto profileData={profileData} setShowImageSelector={(selector: string) => setShowImageSelector(selector as "cover" | "avatar")} />
            <ProfileHeader profileData={profileData} userPhotos={userPhotos} setShowImageSelector={setShowImageSelector} />
            {showImageSelector && (
                <ImageSelectionModal
                    type={showImageSelector}
                    onClose={() => setShowImageSelector(null)}
                    onSelect={(images) => {
                        setSelectedImages(images)
                        setShowImageSelector(null)
                    }}
                />
            )}

        </div>
    )
}

