import { Users } from 'lucide-react'
import { UserPlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import { IUser, IFriendDisplay } from '@/types/types'
import { FindUserByPhone } from '@/apis/friendsRequestApi'
import ResponeUser from '@/components/friends/components/Respone/ResponeUser'

interface ChatFilterSearchProps {
    friends: IFriendDisplay[]
    loadingFriends: boolean
    onSelectUser?: (u: IUser) => void
}

export default function ChatFilterSearch({ friends, loadingFriends, onSelectUser }: ChatFilterSearchProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSelectUser = useCallback((u: IUser) => {
        console.log("ChatFilterSearch - onSelectUser:", u);
        setUser(u); //
        onSelectUser?.(u);
    }, [onSelectUser]);

    useEffect(() => {
        if (!searchQuery) {
            setUser(null);
            return;
        }

        const delay = setTimeout(async () => {
            try {
                setLoading(true);
                const res = await FindUserByPhone(searchQuery);
                if (res && res.length > 0) {
                    setUser(res[0]);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }, 400); // debounce 400ms

        return () => clearTimeout(delay);
    }, [searchQuery]);

    return (
        <div className="">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm tin nhắn, bạn bè..."
                        className="pl-10 pr-12 border-0 focus:ring-2 focus:ring-ring rounded-xl h-9 sm:h-10 text-sm bg-muted text-foreground placeholder:text-muted-foreground focus:bg-background focus:shadow-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="right-3 top-1/2 transform  flex gap-1">
                    <Button variant="ghost" className="p-1 text-medium text-black cursor-pointer h-8 w-68 sm:h-8 sm:w-8 rounded-full hover:bg-accent">
                        <Users className="w-10  h-10 sm:w-7 sm:h-7 text-black " />
                    </Button>
                    <Button variant="ghost" className="p-1 cursor-pointer h-8 w-8 sm:h-8 sm:w-8 rounded-full hover:bg-accent">
                        <UserPlus className="w-10  h-10 sm:w-7 sm:h-7 text-black " />
                    </Button>
                </div>
            </div>

            {/* Friends List Section */}
            {!searchQuery && (
                <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-foreground">Bạn bè ({friends.length})</h3>
                        {loadingFriends && (
                            <div className="text-xs text-muted-foreground">Đang tải...</div>
                        )}
                    </div>
                    <div className="max-h-32 overflow-y-auto">
                        {friends.length > 0 ? (
                            <div className="space-y-1">
                                {friends.map((friend) => (
                                    <div
                                        key={friend.id}
                                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer"
                                        onClick={() => {
                                            const userData: IUser = {
                                                _id: friend.id,
                                                id: friend.id,
                                                username: friend.username,
                                                email: friend.email,
                                                phone: friend.phone,
                                                password: '', // Required field but not used for display
                                                avatar: friend.avatar,
                                                status: friend.status,
                                                lastSeen: friend.lastSeen ? new Date(friend.lastSeen) : undefined
                                            }
                                            handleSelectUser(userData)
                                        }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            {friend.avatar ? (
                                                <img
                                                    src={friend.avatar}
                                                    alt={friend.username}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-xs font-medium text-primary">
                                                    {friend.username.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">
                                                {friend.username}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {friend.isOnline ? 'Đang hoạt động' : 'Ngoại tuyến'}
                                            </p>
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                            }`} />
                                    </div>
                                ))}
                            </div>
                        ) : !loadingFriends && (
                            <p className="text-xs text-muted-foreground text-center py-2">
                                Chưa có bạn bè nào
                            </p>
                        )}
                    </div>
                </div>
            )}

            <ResponeUser user={user} loading={loading} searchQuery={searchQuery} onSelectUser={handleSelectUser} />
        </div>
    )
}
