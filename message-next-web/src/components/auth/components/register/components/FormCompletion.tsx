"use client"

import React from 'react'

interface FormCompletionProps {
    progress: number
    debugInfo?: React.ReactNode
}

export default function FormCompletion({ progress, debugInfo }: FormCompletionProps) {
    return (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center justify-between text-sm">
                <span className="text-blue-700">Tiến độ hoàn thành form:</span>
                <span className="text-blue-500 font-semibold">{Math.round(progress * 100)}%</span>
            </div>
            <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full transition-all duration-300" style={{ width: `${progress * 100}%` }} />
            </div>
            {debugInfo}
        </div>
    )
}


