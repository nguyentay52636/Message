"use client";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'

import TabsMainContentBody from './TabsMainContentBody'
import TabsProduction from './TabsProduction'

export default function TabsMainContent({ profileData, userPhotos, setShowImageSelector }: { profileData: any, userPhotos: any, setShowImageSelector: any }) {
    const [activeTab, setActiveTab] = useState('posts');

    return (
        <>
            <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsProduction />
                    <TabsMainContentBody profileData={profileData} userPhotos={userPhotos} setShowImageSelector={setShowImageSelector} />
                </Tabs>
            </div>
        </>
    )
}
