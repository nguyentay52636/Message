import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { mockGroupInvitations } from "../mock/data";
import { Users } from "lucide-react";

export default function GroupInvitations() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold">Lời mời vào nhóm và cộng đồng</h1>
            </div>

            {/* Stats */}
            <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-lg font-semibold">Lời mời ({mockGroupInvitations.length})</p>
            </div>

            {/* Group Invitations List */}
            <div className="space-y-4">
                {mockGroupInvitations.map((invitation) => (
                    <Card key={invitation.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={invitation.groupAvatar || "/placeholder.svg"} />
                                        <AvatarFallback className="bg-gradient-to-br from-primary/80 to-secondary/80 text-white font-semibold">
                                            {invitation.groupName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{invitation.groupName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {invitation.inviterName} mời bạn • {invitation.memberCount} thành viên • {invitation.inviteTime}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button className="px-4 py-2 rounded-xl">
                                        <Check className="w-4 h-4 mr-2" />
                                        Tham gia
                                    </Button>
                                    <Button variant="outline" className="px-4 py-2 rounded-xl bg-transparent">
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