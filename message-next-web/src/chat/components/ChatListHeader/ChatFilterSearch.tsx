import { Users } from 'lucide-react'
import { UserPlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { IUser } from '@/types/types'
import { FindUserByPhone } from '@/apis/friendsRequestApi'
import ResponeUser from '@/components/friends/components/Respone/ResponeUser'
export default function ChatFilterSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);
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

            <ResponeUser user={user} loading={loading} searchQuery={searchQuery} />


        </div>


    )
}
