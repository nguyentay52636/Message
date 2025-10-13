import React, { useState } from 'react'
import { Users } from 'lucide-react'
import ListFriends from './ListFriendItem/ListFriends'
import SearchFilterFriends from '../SearchFilterFriends'

export default function RenderFriendsList() {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name-asc")
    const [filterBy, setFilterBy] = useState("all")
    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-primary" />
                        <h1 className="text-2xl font-bold">Danh sách bạn bè</h1>
                    </div>
                </div>
            </div>
            <div className="my-4">
                <SearchFilterFriends
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    filterBy={filterBy}
                    setFilterBy={setFilterBy}
                />
                <ListFriends />
            </div>
        </>
    )
}
