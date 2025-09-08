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
        count: mockFriendRequests.length,
    },
]

export const SiderNavigation = ({ activeSection, setActiveSection }: SiderNavigationProps) => {
    return (
        <>
            <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-4 py-2">
                    {sidebarItems.map((item) => (

                        <Button
                            key={item.id}
                            variant={activeSection === item.id ? "ghost" : "ghost"}
                            onClick={() => setActiveSection(item.id)}
                            className={cn(
                                "w-full flex justify-start items-center gap-4 py-8! px-6 rounded-xl cursor-pointer text-left transition-colors",
                                activeSection === item.id ? "bg-blue-300 text-blue-900" : ""
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon className="w-10 h-10" />
                            </div>
                            <span className=" font-semibold text-sm ">{item.label}</span>
                            {
                                item.count > 0 && (
                                    <Badge variant="secondary" className="ml-auto text-sm  rounded-full text-white bg-red-500">
                                        {item.count}
                                    </Badge>
                                )
                            }
                        </Button>

                    ))}
                </div>
            </div >
        </>
    )
}