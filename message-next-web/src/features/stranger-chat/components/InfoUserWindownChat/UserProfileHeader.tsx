import React from 'react'
import { MessageCircle, Phone, Video, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userProfile } from './mockProfile'

interface UserProfileHeaderProps {
    user: {
        id: string
        name: string
        avatar: string
        isOnline?: boolean
    }
}

export default function UserProfileHeader({ user }: UserProfileHeaderProps) {
    return (
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

                {/* Rating */}
                <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(userProfile.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                        {userProfile.rating} ({userProfile.totalReviews} đánh giá)
                    </span>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-center gap-2 mt-3">
                    <Button variant="outline" size="sm" className="gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Nhắn tin
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Phone className="w-4 h-4" />
                        Gọi
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Video className="w-4 h-4" />
                        Video
                    </Button>
                </div>
            </div>
        </div>
    )
}
