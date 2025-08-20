"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    {/* Logo */}
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 3-.35 4.31-.99l3.91 1.99c.39.2.85-.13.85-.56v-3.6C22.35 17.2 23 14.7 23 12c0-5.52-4.48-10-11-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        </svg>
                    </div>

                    {/* Welcome Text */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng bạn!</h1>
                    <p className="text-gray-600 mb-8">Vui lòng chọn cách bạn muốn tiếp tục</p>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <Button
                            onClick={() => router.push('/auth/login')}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200"
                        >
                            Đăng nhập
                        </Button>

                        <Button
                            onClick={() => router.push('/auth/register')}
                            variant="outline"
                            className="w-full h-12 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-200"
                        >
                            Đăng ký
                        </Button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-sm text-gray-500">
                        <p>Bằng việc sử dụng dịch vụ, bạn đồng ý với</p>
                        <div className="flex justify-center gap-4 mt-2">
                            <Button variant="link" className="text-sm p-0 h-auto hover:text-blue-600">
                                Điều khoản sử dụng
                            </Button>
                            <span>•</span>
                            <Button variant="link" className="text-sm p-0 h-auto hover:text-blue-600">
                                Chính sách bảo mật
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
