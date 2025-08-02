"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface ChatTabsBarProps {
    activeTab: "all" | "unread"
    setActiveTab: (tab: "all" | "unread") => void
}

export default function ChatTabsBar({ activeTab, setActiveTab }: ChatTabsBarProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex">
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab("all")}
                    className={`py-2 px-0 mr-8 text-sm font-semibold border-b-2 transition-all ${activeTab === "all"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    Tất cả
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab("unread")}
                    className={`py-2 px-0 text-sm font-semibold border-b-2 transition-all ${activeTab === "unread"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    Chưa đọc
                </Button>
            </div>
            <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
            >
                Phân loại
                <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
        </div>
    )
}
