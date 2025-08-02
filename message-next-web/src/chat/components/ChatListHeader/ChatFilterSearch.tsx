import { Users } from 'lucide-react'
import { UserPlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import React from 'react'
export default function ChatFilterSearch() {
    return (
        <div className="relative mb-3 sm:mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
                placeholder="Tìm kiếm tin nhắn, bạn bè..."
                className="pl-10 pr-12 border-0 focus:ring-2 focus:ring-ring rounded-xl h-9 sm:h-10 text-sm bg-muted text-foreground placeholder:text-muted-foreground focus:bg-background focus:shadow-md"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6 sm:h-7 sm:w-7 rounded-full hover:bg-accent">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6 sm:h-7 sm:w-7 rounded-full hover:bg-accent">
                    <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                </Button>
            </div>
        </div>
    )
}
