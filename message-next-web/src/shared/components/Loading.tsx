"use client";
import React from 'react'

export default function Loading() {
    return (
        <div className="flex items-center justify-center w-full h-full bg-white">
            <div className="flex space-x-2">
                <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce"></span>
            </div>
        </div>
    )
}
