"use client"

import React from 'react'
import { Check } from 'lucide-react'

interface ProgressStepsProps {
    currentStep: number
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
    return (
        <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep >= 1
                        ? "bg-blue-400 text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                        }`}
                >
                    {currentStep > 1 ? <Check className="w-5 h-5" /> : "1"}
                </div>
                <div
                    className={`w-24 h-1 mx-2 transition-all ${currentStep >= 2 ? "bg-blue-400" : "bg-gray-200"}`}
                />
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep >= 2
                        ? "bg-blue-400 text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                        }`}
                >
                    2
                </div>
            </div>
        </div>
    )
}


