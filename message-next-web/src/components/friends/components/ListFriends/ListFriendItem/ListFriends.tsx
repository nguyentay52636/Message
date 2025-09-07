import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { Friend, mockFriends } from '../../mock/data'
import ListFriendsAction from './ListFriendsAction'
interface ListFriendsProps {
    groupedFriends: Record<string, Friend[]>
}
export default function ListFriendsComponent({ groupedFriends }: ListFriendsProps) {
    return (
        <div className="space-y-6">
            <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-lg font-semibold">Bạn bè ({mockFriends.length})</p>
            </div>

            {Object.entries(groupedFriends)
                .sort(([a], [b]) => a.localeCompare(b, "vi"))
                .map(([letter, friends]) => (
                    <div key={letter} className="space-y-3">
                        <h3 className="text-lg font-bold text-muted-foreground">{letter}</h3>
                        <div className="space-y-6">
                            {friends.map((friend) => (
                                <Card key={friend.id} className="hover:bg-gray-100 transition-shadow">
                                    <CardContent className="p-2 ">
                                        <div className="flex items-center justify-between cursor-pointer 0 rounded-xl">
                                            <div className="flex items-center gap-3 cursor-pointer">
                                                <div className="relative px-4 ">
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
                                            <ListFriendsAction />
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
