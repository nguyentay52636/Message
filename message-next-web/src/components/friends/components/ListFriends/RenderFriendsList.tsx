import React, { useState } from 'react'
import { Friend, mockFriends } from '../mock/data'
import { Users } from 'lucide-react'
import ListFriends from './ListFriendItem/ListFriends'
import SearchFilterFriends from '../SearchFilterFriends'
export default function RenderFriendsList() {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name-asc")
    const [filterBy, setFilterBy] = useState("all")

    // Filter and sort friends
    const filteredFriends = mockFriends
        .filter((friend) => {
            const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesFilter =
                filterBy === "all" || (filterBy === "online" && friend.isOnline) || (filterBy === "offline" && !friend.isOnline)
            return matchesSearch && matchesFilter
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "name-asc":
                    return a.name.localeCompare(b.name, "vi")
                case "name-desc":
                    return b.name.localeCompare(a.name, "vi")
                case "online-first":
                    return b.isOnline ? 1 : a.isOnline ? -1 : 0
                default:
                    return 0
            }
        })

    // Group friends by first letter
    const groupedFriends = filteredFriends.reduce(
        (groups, friend) => {
            const firstLetter = friend.name.charAt(0).toUpperCase()
            if (!groups[firstLetter]) {
                groups[firstLetter] = []
            }
            groups[firstLetter].push(friend)
            return groups
        },
        {} as Record<string, Friend[]>,
    )
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
                <ListFriends groupedFriends={groupedFriends} />
            </div>
        </>
    )
}
