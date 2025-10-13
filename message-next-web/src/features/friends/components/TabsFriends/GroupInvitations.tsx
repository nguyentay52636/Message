import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X, Users } from "lucide-react";
import { mockGroupInvitations } from "../mock/data";

export default function GroupInvitations() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">
                    Lời mời vào nhóm & cộng đồng
                </h1>
            </div>

            {/* Stats */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between">
                <p className="text-sm text-gray-700">
                    Tổng cộng <span className="font-semibold text-blue-700">{mockGroupInvitations.length}</span> lời mời
                </p>
            </div>

            {/* Group Invitations List */}
            <div className="space-y-3">
                {mockGroupInvitations.map((invitation) => (
                    <Card
                        key={invitation.id}
                        className="rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 bg-white"
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between gap-4">
                                {/* Thông tin nhóm */}
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage
                                                src={invitation.groupAvatar || "/placeholder.svg"}
                                            />
                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                                                {invitation.groupName.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-medium text-gray-900 leading-tight">
                                            {invitation.groupName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {invitation.inviterName} mời bạn • {invitation.memberCount} thành viên •{" "}
                                            {invitation.inviteTime}
                                        </p>
                                    </div>
                                </div>

                                {/* Nút hành động */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <Button className="px-3 py-2 h-auto text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1">
                                        <Check className="w-4 h-4" />
                                        Tham gia
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="px-3 py-2 h-auto text-sm rounded-lg border-gray-300 hover:bg-gray-100 flex items-center gap-1 text-gray-600"
                                    >
                                        <X className="w-4 h-4" />
                                        Từ chối
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
