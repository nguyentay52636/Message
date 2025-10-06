"use client"

import React from 'react'

interface PasswordStrengthProps {
    strength: number
    label: { text: string; color: string }
}

export default function PasswordStrength({ strength, label }: PasswordStrengthProps) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all ${strength <= 2
                        ? "bg-red-500"
                        : strength <= 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                />
            </div>
            <span className={`text-xs font-semibold ${label.color}`}>{label.text}</span>
        </div>
    )
}


