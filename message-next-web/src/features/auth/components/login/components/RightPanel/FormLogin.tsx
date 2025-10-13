"use client"

import React from "react"
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { ArrowRight } from 'lucide-react'
import LoginMethodToggle from "./components/LoginMethodToggle"
import PhoneEmailInput from "./components/PhoneEmailInput"
import PasswordInput from "./components/PasswordInput"
import RememberForgotRow from "./components/RememberForgotRow"
import SocialButtons from "./components/SocialButtons"
import { useLoginForm } from "./hooks/useLoginForm"
import { useRouter } from "next/navigation"

export default function FormLogin() {
    const router = useRouter()
    const { state, actions } = useLoginForm({ onLoginSuccess: () => router.push('/strager-chat') })
    const { formData, loginMethod, showPassword, isLoading } = state

    return (
        <div className="bg-white w-full p-4 border border-gray-100 w-full">
            <form onSubmit={actions.handleSubmitLogin} className="space-y-6">
                <LoginMethodToggle
                    loginMethod={loginMethod}
                    onChange={actions.handleLoginMethodChange}
                    disabled={isLoading}
                />

                {/* Phone/Email Input */}
                <PhoneEmailInput
                    loginMethod={loginMethod}
                    value={formData.phone}
                    onChange={(val) => actions.handleInputChange("phone", val)}
                    disabled={isLoading}
                />

                {/* Password Input */}
                <PasswordInput
                    value={formData.password}
                    onChange={(val) => actions.handleInputChange("password", val)}
                    showPassword={showPassword}
                    onToggleShow={() => actions.setShowPassword(!showPassword)}
                    disabled={isLoading}
                />

                {/* Remember Me & Forgot Password */}
                <RememberForgotRow
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => actions.handleInputChange("rememberMe", checked)}
                    disabled={isLoading}
                />

                {/* Login Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-400 hover:bg-blue-500 cursor-pointer text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
                >
                    {isLoading ? (
                        <>
                            <Spinner size="sm" className="text-white" />
                            Đang đăng nhập...
                        </>
                    ) : (
                        <>
                            Đăng nhập
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </Button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Hoặc đăng nhập bằng</span>
                    </div>
                </div>

                {/* Social Login */}
                <SocialButtons />
            </form>

            {/* Register Link */}
            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Chưa có tài khoản?{" "}
                    <Button
                        variant='link'
                        onClick={() => router.push('/auth/register')}
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Đăng ký ngay
                    </Button>
                </p>
            </div>
        </div>
    )
}
