import { Plus } from "lucide-react";

import { Button } from '@/components/ui/button'
import React from 'react'
import { MoreHorizontal } from "lucide-react";
export default function HeaderTitle() {
    return (
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-foreground">Tin nhắn</h1>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <Plus className="w-5 h-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <MoreHorizontal className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}
