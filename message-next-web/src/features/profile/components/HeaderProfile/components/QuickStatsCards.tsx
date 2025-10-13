import { Card, CardContent } from '@/components/ui/card'
import { ThumbsUp, MessageCircle, Eye, Users } from 'lucide-react'
import React from 'react'

export default function QuickStatsCards({ profileData }: { profileData: any }) {
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="glass-effect border-white/20 card-hover">
                    <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <ThumbsUp className="h-6 w-6 text-red-400" />
                        </div>
                        <p className="text-2xl font-bold gradient-text">{profileData.stats.totalLikes.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Lượt thích</p>
                    </CardContent>
                </Card>

                <Card className="glass-effect border-white/20 card-hover">
                    <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <MessageCircle className="h-6 w-6 text-blue-400" />
                        </div>
                        <p className="text-2xl font-bold gradient-text">{profileData.stats.totalComments.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Bình luận</p>
                    </CardContent>
                </Card>

                <Card className="glass-effect border-white/20 card-hover">
                    <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <Eye className="h-6 w-6 text-green-400" />
                        </div>
                        <p className="text-2xl font-bold gradient-text">{profileData.stats.postViews.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Lượt xem bài viết</p>
                    </CardContent>
                </Card>

                <Card className="glass-effect border-white/20 card-hover">
                    <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <Users className="h-6 w-6 text-purple-400" />
                        </div>
                        <p className="text-2xl font-bold gradient-text">{profileData.friendsCount}</p>
                        <p className="text-sm text-muted-foreground">Bạn bè</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
