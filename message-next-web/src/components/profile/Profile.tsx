"use client";
import React, { useState } from 'react'

import ProfileHeader from './components/HeaderProfile/HeaderProfile'
import { profileData, userPhotos, currentUser } from './mock/data'
import { ImageSelectionModal } from './components/ImageSelectionModal'
import CoverPhoto from './components/Photo/CoverPhoto';
export default function Profile() {
    const [showChatBubble, setShowChatBubble] = useState(false)
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const [showImageSelector, setShowImageSelector] = useState<"cover" | "avatar" | null>(null)

    return (
        <div className="min-h-screen bg-background">
            {/* Cover Photo */}
            <CoverPhoto profileData={profileData} setShowImageSelector={(selector: string) => setShowImageSelector(selector as "cover" | "avatar")} />
            {/* Profile Header */}
            <ProfileHeader profileData={profileData} userPhotos={userPhotos} setShowImageSelector={setShowImageSelector} />


            {/* Image Selector Modal */}
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
