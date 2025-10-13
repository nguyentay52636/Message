import { Button } from '@/components/ui/button'
import React from 'react'
import { ArrowLeft, UserPlus, Search } from 'lucide-react'
export default function HeaderMobile({ onBack }: { onBack: () => void }) {
    return (
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
    )
}
