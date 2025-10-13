"use client";
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useState } from 'react'
import { MapPin, Calendar, Eye, Plus, Edit } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { formatDate } from '@/lib/utils'
import DialogEditProfile from '../../Dialog/DialogEditProfile';


export default function ImageProfile({ profileData, setShowImageSelector, onClose }: { profileData: any, setShowImageSelector: any, onClose: any }) {
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    return (
        <div className="relative flex flex-col md:flex-row items-start md:items-end -mt-24 mb-8">
            <div className="relative z-10">
                <Avatar className="h-48 w-48 border-6 border-background ring-4 ring-primary/30">
                    <AvatarImage src="https://scontent.fuih1-1.fna.fbcdn.net/v/t39.30808-6/499499551_3981598038780723_982113078773541381_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEHNKotuxnXr4_Lpzi-4iCf8GJXGMh30X_wYlcYyHfRf9sQys6-kH6YcjO9K1GILkHNBAReBORsuLrTDdizJRWt&_nc_ohc=N9rDKnyEMA8Q7kNvwEfIx1s&_nc_oc=AdkYbtyVxkoHexGd5z8OJG3m0T28iqD0vYcAlvEF2dxIFvSOcD5-ZG9vtfmwFITFzEM&_nc_zt=23&_nc_ht=scontent.fuih1-1.fna&_nc_gid=1aEhLr9_TgDwm_zVTVMatg&oh=00_AfXqqPccKuaonOXbk8nLg7ZdTFGf1nQq9KuvYuh36-XHdQ&oe=68B1ACDC" alt={profileData.name} />
                    <AvatarFallback className="text-6xl bg-gradient-to-br from-primary to-pink-500 text-white font-bold">
                        {profileData.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-4 right-4 h-12 w-12 rounded-full glass-effect border-white/20 hover:bg-white/20"
                    onClick={() => setShowImageSelector("avatar")}
                >
                    <Camera className="h-6 w-6" />
                </Button>
            </div>

            <div className="flex-1 mt-6 md:mt-0 md:ml-8 md:mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-foreground">{profileData.name}</h1>


                        <div className="flex flex-row items-center space-x-6 text-black">
                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    {profileData.stats.profileViews.toLocaleString()}
                                </p>
                                <p className="text-sm opacity-90">Lượt xem profile</p>
                            </div>

                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    {profileData.stats.totalLikes.toLocaleString()}
                                </p>
                                <p className="text-sm opacity-90">Lượt thích</p>
                            </div>

                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    {profileData.stats.friendsCount}
                                </p>
                                <p className="text-sm opacity-90">Bạn bè</p>
                            </div>
                        </div>



                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{profileData.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Tham gia {formatDate(profileData.joinDate)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{profileData.stats.profileViews.toLocaleString()} lượt xem</span>
                            </div>
                        </div>
                    </div>
                    {/* Profile Stats Overlay */}

                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                        <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-500 hover:bg-blue-400 cursor-pointer ">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Chỉnh sửa trang cá nhân
                                </Button>
                            </DialogTrigger>
                            <DialogContent className=" cursor-pointe max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
                                </DialogHeader>
                                <DialogEditProfile />
                            </DialogContent>
                        </Dialog>

                        <Button variant="outline" className="border-white/20 hover:bg-white/10">
                            <Plus className="mr-2 h-4 w-4" />
                            Thêm story
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
