"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserPlus, Users } from "lucide-react"
import { mockFriendRequests, mockFriends } from "./mock/data"
import { cn } from "@/lib/utils"

interface SiderNavigationProps {
    activeSection: string
    setActiveSection: (section: string) => void
}

const sidebarItems = [
    {
        id: "friends",
        label: "Danh sách bạn bè",
        icon: Users,
        count: mockFriends.length,
    },
    {
        id: "groups",
        label: "Danh sách nhóm & cộng đồng",
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
        label: "Lời mời vào nhóm",
        icon: Users,
        count: mockFriendRequests.length,
    },
]

export const SiderNavigation = ({ activeSection, setActiveSection }: SiderNavigationProps) => {
    return (
        <div className="flex cursor-pointer flex-col bg-white h-full border-r border-gray-200">
            <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1 px-2">
                    {sidebarItems.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            onClick={() => setActiveSection(item.id)}
                            className={cn(
                                "w-full flex items-center cursor-pointer justify-start gap-3 rounded-lg px-4 py-5! transition-all duration-200 text-gray-800 hover:bg-gray-100",
                                activeSection === item.id && "bg-blue-100 text-blue-600 font-medium"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "w-5 h-5",
                                    activeSection === item.id ? "text-blue-600" : "text-gray-500"
                                )}
                            />
                            <span className="flex-1 text-left text-sm">
                                {item.label}
                            </span>

                            {item.count > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white"
                                >
                                    {item.count}
                                </Badge>
                            )}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
