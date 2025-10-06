"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import FormLogin from "@/components/auth/components/login/RightPanel/FormLogin"
import FooterLogin from "@/components/auth/components/login/FooterLogin"
import LeftPanelLogin from "@/components/auth/components/login/LeftPanel/LeftPanelLogin"
import { Alert } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"

interface LoginFormProps {
    onSwitchToRegister: () => void
    onLoginSuccess: () => void
}

function LoginForm({ onSwitchToRegister, onLoginSuccess }: LoginFormProps) {
    const { isLoading, error } = useSelector((state: RootState) => state.auth)

    return (
        <div className="min-h-screen flex relative">
            {isLoading && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
                        <Spinner size="lg" className="text-blue-600" />
                        <p className="text-gray-700 font-medium">Đang đăng nhập...</p>
                    </div>
                </div>
            )}

            <LeftPanelLogin />

            <div className="w-full lg:w-1/2 flex items-center justify-center p-10 bg-gray-50 rounded-3xl">
                <div className="w-full max-w-md">
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-16 h-16 bg-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 3-.35 4.31-.99l3.91 1.99c.39.2.85-.13.85-.56v-3.6C22.35 17.2 23 14.7 23 12c0-5.52-4.48-10-11-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Chào mừng trở lại!</h1>
                        <p className="text-gray-600">Đăng nhập để tiếp tục</p>
                    </div>

                    {/* Desktop Header */}
                    <div className="hidden lg:block text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
                        <p className="text-gray-600">Chào mừng bạn trở lại với Zalo</p>
                    </div>
                    {error && (
                        <Alert
                            variant="destructive"
                            title="Lỗi đăng nhập"
                            className="mb-4"
                        >
                            {error}
                        </Alert>
                    )}
                    <FormLogin
                        onSwitchToRegister={onSwitchToRegister}
                        onLoginSuccess={onLoginSuccess}
                    />
                    <FooterLogin />
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    const router = useRouter()

    const handleSwitchToRegister = () => {
        router.push('/auth/register')
    }

    const handleLoginSuccess = () => {
        console.log("Login successful")
        // Có thể thêm logic bổ sung ở đây nếu cần
    }

    return <LoginForm onSwitchToRegister={handleSwitchToRegister} onLoginSuccess={handleLoginSuccess} />
}
