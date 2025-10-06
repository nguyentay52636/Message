"use client"

import React from 'react'
import { Input } from '@/components/ui/input'

interface OTPSectionProps {
    email?: string
    otp: string
    setOtp: (val: string) => void
    countdown: number
    isLoading: boolean
    onResend: () => void
}

export default function OTPSection({ email, otp, setOtp, countdown, isLoading, onResend }: OTPSectionProps) {
    return (
        <>
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <p className="text-gray-600 mb-2">Mã xác thực đã được gửi đến</p>
                <p className="font-semibold text-gray-900 text-lg">{email}</p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Mã xác thực</label>
                <Input
                    type="text"
                    placeholder="Nhập mã 6 số"
                    className="h-12 text-base text-center tracking-widest border-gray-300 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                />
            </div>

            <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Không nhận được mã?</p>
                <button
                    type="button"
                    onClick={onResend}
                    disabled={countdown > 0 || isLoading}
                    className={`text-sm font-semibold ${countdown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-400 hover:text-blue-500'}`}
                >
                    {countdown > 0 ? `Gửi lại mã (${countdown}s)` : 'Gửi lại mã'}
                </button>
            </div>
        </>
    )
}


