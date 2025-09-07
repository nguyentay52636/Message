"use client"

import { useState } from "react"
import { Search, Users, UserPlus, ArrowLeft, Group } from "lucide-react"

import { mockFriends, Friend } from "./components/mock/data"
import SearchFilterFriends from "./components/SearchFilterFriends"
import FriendsRequest from "./components/TabsFriends/FriendRequest/FriendsRequest"
import GroupInvitations from "./components/TabsFriends/GroupInvitations"
import SearchUser from "./components/SearchUser/SearchUser"
import { SiderNavigation } from "./components/SiderNavigation"
import HeaderMobile from "./components/mobile/HeaderMobile"
import RenderFriendsList from "./components/ListFriends/RenderFriendsList"



interface FriendsPageProps {
    onBack?: () => void
}

export function FriendsPage({ onBack }: FriendsPageProps) {
    const [activeSection, setActiveSection] = useState("friends")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name-asc")
    const [filterBy, setFilterBy] = useState("all")



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





    const renderContent = () => {
        switch (activeSection) {
            case "friends":
                return <RenderFriendsList />
            case "requests":
                return <FriendsRequest />
            case "group-invites":
                return <GroupInvitations />
            case "groups":
                return <Group />
            default:
                return <RenderFriendsList />
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <HeaderMobile onBack={onBack || (() => { })} />

            <div className="flex h-screen">
                <div className="flex w-72 flex-col bg-card border-r border-border">

                    <SearchUser onBack={() => console.log("Back")} />
                    <SiderNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="mx-auto p-6">{renderContent()}</div>
                </div>
            </div>
            {/* <>
                <SearchFilterFriends
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    filterBy={filterBy}
                    setFilterBy={setFilterBy}
                />
            </> */}

        </div>



    )
}
