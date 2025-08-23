import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MessageCircle, MoreHorizontal, Phone, Video } from 'lucide-react'
import React from 'react'
import { Friend } from './mock/data'
interface ListFriendsProps {
    groupedFriends: Record<string, Friend[]>
}
export default function ListFriends({ groupedFriends }: ListFriendsProps) {
    return (
        <div className="space-y-6">
            {Object.entries(groupedFriends)
                .sort(([a], [b]) => a.localeCompare(b, "vi"))
                .map(([letter, friends]) => (
                    <div key={letter} className="space-y-3">
                        <h3 className="text-lg font-bold text-muted-foreground">{letter}</h3>
                        <div className="space-y-2">
                            {friends.map((friend) => (
                                <Card key={friend.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar className="w-12 h-12">
                                                        <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback className="bg-gradient-to-br from-primary/80 to-secondary/80 text-white font-semibold">
                                                            {friend.name.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {friend.isOnline && (
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{friend.name}</p>
                                                    {friend.isOnline ? (
                                                        <p className="text-sm text-green-600">Đang hoạt động</p>
                                                    ) : (
                                                        <p className="text-sm text-muted-foreground">Hoạt động {friend.lastSeen || "lâu rồi"}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" className="p-2 rounded-xl hover:bg-accent">
                                                    <MessageCircle className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-2 rounded-xl hover:bg-accent">
                                                    <Phone className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-2 rounded-xl hover:bg-accent">
                                                    <Video className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-2 rounded-xl hover:bg-accent">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}
