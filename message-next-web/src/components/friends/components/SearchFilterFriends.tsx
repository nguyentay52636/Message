import { Search } from 'lucide-react'
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
interface SearchFilterFriendsProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
    sortBy: string
    setSortBy: (sort: string) => void
    filterBy: string
    setFilterBy: (filter: string) => void
}

export default function SearchFilterFriends({ searchQuery, setSearchQuery, sortBy, setSortBy, filterBy, setFilterBy }: SearchFilterFriendsProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Tìm bạn"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-xl"
                />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl">
                    <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name-asc">Tên (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Tên (Z-A)</SelectItem>
                    <SelectItem value="online-first">Online trước</SelectItem>
                </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full sm:w-32 h-12 rounded-xl">
                    <SelectValue placeholder="Lọc" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
