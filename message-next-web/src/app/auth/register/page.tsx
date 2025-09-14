"use client"

import React from "react"
import { useRouter } from "next/navigation"
import RegisterLeft from "@/components/auth/components/register/RegisterLeft"
import FormRegister from "@/components/auth/components/register/FormRegister"

interface RegisterFormProps {
    onSwitchToLogin: () => void
    onRegisterSuccess: () => void
}

function RegisterForm({ onSwitchToLogin, onRegisterSuccess }: RegisterFormProps) {
    return (
        <div className="min-h-screen flex">
            <RegisterLeft />
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 3-.35 4.31-.99l3.91 1.99c.39.2.85-.13.85-.56v-3.6C22.35 17.2 23 14.7 23 12c0-5.52-4.48-10-11-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tạo tài khoản mới</h1>
                        <p className="text-gray-600">Điền thông tin để bắt đầu</p>
                    </div>

                    {/* Desktop Header */}
                    <div className="hidden lg:block text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký</h1>
                        <p className="text-gray-600">Tạo tài khoản Zalo của bạn</p>
                    </div>

                    {/* Register Form */}
                    <FormRegister
                        onSwitchToLogin={onSwitchToLogin}
                        onRegisterSuccess={onRegisterSuccess}
                    />
                </div>
            </div>
        </div>
    )
}

// Default export for the register page
export default function RegisterPage() {
    const router = useRouter()

    const handleRegisterSuccess = () => {
        console.log("Register successful")
        // Add navigation logic here
        // router.push('/chat')
    }

    const handleSwitchToLogin = () => {
        // Navigate to login page
        router.push('/auth/login')
    }

    return (
        <RegisterForm
            onSwitchToLogin={handleSwitchToLogin}
            onRegisterSuccess={handleRegisterSuccess}
        />
    )
}
