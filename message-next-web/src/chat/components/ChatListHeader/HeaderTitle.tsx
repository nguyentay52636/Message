import { Plus } from "lucide-react";

import { Button } from '@/components/ui/button'
import React from 'react'
import { MoreHorizontal } from "lucide-react";
import { IUser } from '@/types/types'

interface HeaderTitleProps {
    user: IUser | null
}

export default function HeaderTitle({ user }: HeaderTitleProps) {
    return (
        <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl font-bold text-foreground">Tin nhắn</h1>
                {user && (
                    <p className="text-xs text-muted-foreground">
                        Xin chào, {user.username}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5 sm:p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5 sm:p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
            </div>
        </div>
    )
}
