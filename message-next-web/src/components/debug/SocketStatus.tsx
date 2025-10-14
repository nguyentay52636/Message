"use client"

import { useAppSelector } from "@/redux/hooks/hooks"
import { selectSocket } from "@/redux/slices/socketSlice"

export function SocketStatus() {
    const { isConnected, onlineUsers, isLoading, error } = useAppSelector(selectSocket)

    return (
        <div className="fixed top-4 right-4 z-50 bg-white border rounded-lg shadow-lg p-3 text-xs">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span>Socket: {isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
                <div>Online Users: {onlineUsers?.length || 0}</div>
                <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
                {error && <div className="text-red-500">Error: {error}</div>}
            </div>
        </div>
    )
}
