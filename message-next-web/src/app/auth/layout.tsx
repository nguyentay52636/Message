"use client"

import { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode
}

// Default export for Next.js layout
export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen">
            {children}
        </div>
    )
} 