
import { TabsTrigger, TabsList } from '@/components/ui/tabs'
import { Bookmark, Info, ImageIcon, Award, Star } from 'lucide-react'
import React from 'react'

export default function TabsProduction() {
    return (
        <>
            <TabsList className="grid w-full grid-cols-5 mb-6 glass-effect">
                <TabsTrigger value="posts">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Bài viết
                </TabsTrigger>
                <TabsTrigger value="about">
                    <Info className="mr-2 h-4 w-4" />
                    Giới thiệu
                </TabsTrigger>
                <TabsTrigger value="photos">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Ảnh
                </TabsTrigger>
                <TabsTrigger value="experience">
                    <Award className="mr-2 h-4 w-4" />
                    Kinh nghiệm
                </TabsTrigger>
                <TabsTrigger value="achievements">
                    <Star className="mr-2 h-4 w-4" />
                    Thành tích
                </TabsTrigger>
            </TabsList>
        </>
    )
}
