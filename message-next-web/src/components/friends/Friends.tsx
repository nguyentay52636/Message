"use client"

import { useState } from "react"
import { Search, Users, UserPlus, ArrowLeft, Group } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { mockFriends, mockFriendRequests, mockGroupInvitations, Friend } from "./components/mock/data"
import SearchFilterFriends from "./components/SearchFilterFriends"
import ListFriends from "./components/TabsFriends/ListFriends"
import FriendsRequest from "./components/TabsFriends/FriendRequest/FriendsRequest"
import GroupInvitations from "./components/TabsFriends/GroupInvitations"
import SearchUser from "./components/SearchUser/SearchUser"
import { SiderNavigation } from "./components/SiderNavigation"



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

    const sidebarItems = [
        {
            id: "friends",
            label: "Danh sách bạn bè",
            icon: Users,
            count: mockFriends.length,
        },
        {
            id: "groups",
            label: "Danh sách nhóm và cộng đồng",
            icon: Users,
            count: 15,
        },
        {
            id: "requests",
            label: "Lời mời kết bạn",
            icon: UserPlus,
            count: mockFriendRequests.length,
        },
        {
            id: "group-invites",
            label: "Lời mời vào nhóm và cộng đồng",
            icon: Users,
            count: mockGroupInvitations.length,
        },
    ]

    const renderFriendsList = () => (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary" />
                    <h1 className="text-2xl font-bold">Danh sách bạn bè</h1>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-lg font-semibold">Bạn bè ({mockFriends.length})</p>
            </div>

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
    )

    const renderContent = () => {
        switch (activeSection) {
            case "friends":
                return renderFriendsList()
            case "requests":
                return <FriendsRequest />
            case "group-invites":
                return <GroupInvitations />
            case "groups":
                return <Group />
            default:
                return renderFriendsList()
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Header */}
            <div className="lg:hidden sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Button variant="default" size="sm" onClick={onBack} className="p-2 rounded-xl hover:bg-accent">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <h1 className="text-xl font-bold">Bạn bè</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="p-2 rounded-xl hover:bg-accent">
                            <UserPlus className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2 rounded-xl hover:bg-accent">
                            <Search className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="flex w-72 flex-col bg-card border-r border-border">

                    <SearchUser onBack={() => console.log("Back")} />


                    {/* Sidebar Navigation */}
                    <SiderNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="mx-auto p-6">{renderContent()}</div>
                </div>
            </div>
        </div>
    )
}
