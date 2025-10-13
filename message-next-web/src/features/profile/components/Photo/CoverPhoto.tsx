import React from 'react'
import { Button } from '@/components/ui/button'
import { Camera, MoreHorizontal, Share, Settings } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface CoverPhotoProps {
    profileData: {
        coverPhoto: string;
        stats: {
            profileViews: number;
            totalLikes: number;
            friendsCount: number;
        };
    };
    setShowImageSelector: (selector: string) => void;
}

export default function CoverPhoto({ profileData, setShowImageSelector }: CoverPhotoProps) {
    console.log('coverPhoto:', profileData.coverPhoto);

    return (
        <div className="relative h-[400px] w-full">
            <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Cover"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Cover Actions */}
            <div className="absolute bottom-6 right-6 flex items-center space-x-3">
                <Button
                    variant="secondary"
                    size="sm"
                    className="glass-effect border-white/20 cursor-pointer hover:bg-white/80"
                    onClick={() => setShowImageSelector("cover")}
                >
                    <Camera className="mr-2 h-4 w-4" />
                    Cập nhật ảnh bìa
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="glass-effect border-white/20 cursor-pointer hover:bg-white/80">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-effect border-white/20 cursor-pointer hover:bg-white/80">
                        <DropdownMenuItem className="glass-effect border-white/20 cursor-pointer hover:bg-white/80">
                            <Share className="mr-2 h-4 w-4" />
                            Chia sẻ trang cá nhân
                        </DropdownMenuItem>
                        <DropdownMenuItem className="glass-effect border-white/20 cursor-pointer hover:bg-white/80">
                            <Settings className="mr-2 h-4 w-4" />
                            Cài đặt trang cá nhân
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


        </div>
    )
}
