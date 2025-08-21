import React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

interface AlertProps {
    variant?: "default" | "destructive" | "success" | "info"
    title?: string
    children: React.ReactNode
    className?: string
    onClose?: () => void
}

const alertVariants = {
    default: "bg-blue-50 border-blue-200 text-blue-800",
    destructive: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
    info: "bg-blue-50 border-blue-200 text-blue-800"
}

const alertIcons = {
    default: Info,
    destructive: XCircle,
    success: CheckCircle,
    info: Info
}

export function Alert({
    variant = "default",
    title,
    children,
    className,
    onClose
}: AlertProps) {
    const Icon = alertIcons[variant]

    return (
        <div className={cn(
            "relative p-4 border rounded-lg",
            alertVariants[variant],
            className
        )}>
            <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                    {title && (
                        <h4 className="font-semibold mb-1">{title}</h4>
                    )}
                    <div className="text-sm">{children}</div>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-current hover:opacity-70 transition-opacity"
                    >
                        <XCircle className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    )
} 