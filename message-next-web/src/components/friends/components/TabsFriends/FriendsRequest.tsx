import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
import { mockFriendRequests } from "../mock/data";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function FriendsRequest() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <UserPlus className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold">Lời mời kết bạn</h1>
            </div>

            {/* Stats */}
            <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-lg font-semibold">Lời mời ({mockFriendRequests.length})</p>
            </div>

            {/* Friend Requests List */}
            <div className="space-y-4">
                {mockFriendRequests.map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={request.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="bg-gradient-to-br from-primary/80 to-secondary/80 text-white font-semibold">
                                            {request.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{request.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {request.mutualFriends} bạn chung • {request.requestTime}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button className="px-4 py-2 rounded-xl cursor-pointer">
                                        <Check className="w-4 h-4 mr-2" />
                                        Chấp nhận
                                    </Button>
                                    <Button variant="outline" className="px-4 py-2 rounded-xl bg-transparent cursor-pointer">
                                        <X className="w-4 h-4 mr-2" />
                                        Từ chối
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}