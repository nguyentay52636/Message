import React from 'react'
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CollapsibleSectionProps {
    title: string
    icon: React.ReactNode
    isExpanded: boolean
    onToggle: () => void
    children: React.ReactNode
}

export default function CollapsibleSection({
    title,
    icon,
    isExpanded,
    onToggle,
    children
}: CollapsibleSectionProps) {
    return (
        <div className="bg-white border-b border-gray-200">
            <Button
                variant="ghost"
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="font-medium text-gray-900">{title}</span>
                </div>
                {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
            </Button>
            {isExpanded && (
                <div className="px-4 pb-4 bg-gray-50">
                    {children}
                </div>
            )}
        </div>
    )
}
