"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Phone, Mail, ArrowRight, Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface RegisterFormProps {
    onSwitchToLogin: () => void
    onRegisterSuccess: () => void
}

export function RegisterForm({ onSwitchToLogin, onRegisterSuccess }: RegisterFormProps) {
    const [registerMethod, setRegisterMethod] = useState<"phone" | "email">("phone")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        fullName: "",
        phoneOrEmail: "",
        password: "",
        confirmPassword: "",
        verificationCode: "",
        agreeTerms: false,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        if (currentStep === 1) {
            // Simulate sending verification code
            setTimeout(() => {
                setIsLoading(false)
                setCurrentStep(2)
            }, 2000)
        } else {
            // Simulate registration process
            setTimeout(() => {
                setIsLoading(false)
                onRegisterSuccess()
            }, 2000)
        }
    }

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        if (field === "password") {
            calculatePasswordStrength(value as string)
        }
    }

    const calculatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/[a-z]/.test(password)) strength++
        if (/[0-9]/.test(password)) strength++
        if (/[^A-Za-z0-9]/.test(password)) strength++
        setPasswordStrength(strength)
    }

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 0:
            case 1:
                return { text: "Yếu", color: "text-red-500" }
            case 2:
            case 3:
                return { text: "Trung bình", color: "text-yellow-500" }
            case 4:
            case 5:
                return { text: "Mạnh", color: "text-green-500" }
            default:
                return { text: "", color: "" }
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-700 to-indigo-800 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                    <div className="absolute bottom-32 left-32 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
                    {/* Logo */}
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 3-.35 4.31-.99l3.91 1.99c.39.2.85-.13.85-.56v-3.6C22.35 17.2 23 14.7 23 12c0-5.52-4.48-10-11-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        </svg>
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                            Tham gia Zalo ngay!
                        </h1>
                        <p className="text-xl text-purple-100 leading-relaxed max-w-md">
                            Tạo tài khoản để bắt đầu kết nối với bạn bè và khám phá thế giới trò chuyện thú vị
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-6 max-w-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Kết nối bạn bè</h3>
                                <p className="text-purple-100 text-sm">Tìm và kết nối với bạn bè dễ dàng</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Chia sẻ khoảnh khắc</h3>
                                <p className="text-purple-100 text-sm">Chia sẻ hình ảnh, video và cảm xúc</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Trải nghiệm mới</h3>
                                <p className="text-purple-100 text-sm">Khám phá tính năng và dịch vụ độc đáo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 3-.35 4.31-.99l3.91 1.99c.39.2.85-.13.85-.56v-3.6C22.35 17.2 23 14.7 23 12c0-5.52-4.48-10-11-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tạo tài khoản mới</h1>
                        <p className="text-gray-600">{currentStep === 1 ? "Điền thông tin để bắt đầu" : "Xác thực tài khoản"}</p>
                    </div>

                    {/* Desktop Header */}
                    <div className="hidden lg:block text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký</h1>
                        <p className="text-gray-600">
                            {currentStep === 1 ? "Tạo tài khoản Zalo của bạn" : "Xác thực số điện thoại/email"}
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep >= 1
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                    : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {currentStep > 1 ? <Check className="w-5 h-5" /> : "1"}
                            </div>
                            <div
                                className={`w-20 h-1 mx-2 transition-all ${currentStep >= 2 ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-200"}`}
                            />
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep >= 2
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                    : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                2
                            </div>
                        </div>
                    </div>

                    {/* Register Form */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {currentStep === 1 ? (
                                <>
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Họ và tên</label>
                                        <Input
                                            type="text"
                                            placeholder="Nhập họ và tên đầy đủ"
                                            value={formData.fullName}
                                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                                            className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                            required
                                        />
                                    </div>

                                    {/* Register Method Toggle */}
                                    <div className="flex bg-gray-100 rounded-2xl p-1">
                                        <button
                                            type="button"
                                            onClick={() => setRegisterMethod("phone")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${registerMethod === "phone"
                                                ? "bg-white text-blue-600 shadow-md"
                                                : "text-gray-600 hover:text-gray-800"
                                                }`}
                                        >
                                            <Phone className="w-4 h-4" />
                                            Số điện thoại
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRegisterMethod("email")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${registerMethod === "email"
                                                ? "bg-white text-blue-600 shadow-md"
                                                : "text-gray-600 hover:text-gray-800"
                                                }`}
                                        >
                                            <Mail className="w-4 h-4" />
                                            Email
                                        </button>
                                    </div>

                                    {/* Phone/Email Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">
                                            {registerMethod === "phone" ? "Số điện thoại" : "Email"}
                                        </label>
                                        <Input
                                            type={registerMethod === "phone" ? "tel" : "email"}
                                            placeholder={registerMethod === "phone" ? "Nhập số điện thoại" : "Nhập email"}
                                            value={formData.phoneOrEmail}
                                            onChange={(e) => handleInputChange("phoneOrEmail", e.target.value)}
                                            className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                            required
                                        />
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Mật khẩu</label>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                                                value={formData.password}
                                                onChange={(e) => handleInputChange("password", e.target.value)}
                                                className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-12 rounded-xl"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        {formData.password && (
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full transition-all ${passwordStrength <= 2
                                                            ? "bg-red-500"
                                                            : passwordStrength <= 3
                                                                ? "bg-yellow-500"
                                                                : "bg-green-500"
                                                            }`}
                                                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                    />
                                                </div>
                                                <span className={`text-xs font-semibold ${getPasswordStrengthText().color}`}>
                                                    {getPasswordStrengthText().text}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Xác nhận mật khẩu</label>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Nhập lại mật khẩu"
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                                className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-12 rounded-xl"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                            <p className="text-sm text-red-500 font-medium">Mật khẩu không khớp</p>
                                        )}
                                    </div>

                                    {/* Terms Agreement */}
                                    <div className="flex items-start space-x-3">
                                        <Checkbox
                                            id="terms"
                                            checked={formData.agreeTerms}
                                            onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                                            className="mt-1"
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                                            Tôi đồng ý với{" "}
                                            <button type="button" className="text-blue-600 hover:text-blue-700 font-semibold">
                                                Điều khoản sử dụng
                                            </button>{" "}
                                            và{" "}
                                            <button type="button" className="text-blue-600 hover:text-blue-700 font-semibold">
                                                Chính sách bảo mật
                                            </button>{" "}
                                            của Zalo
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Verification Code */}
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 mb-2">Mã xác thực đã được gửi đến</p>
                                        <p className="font-semibold text-gray-900 text-lg">{formData.phoneOrEmail}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Mã xác thực</label>
                                        <Input
                                            type="text"
                                            placeholder="Nhập mã 6 số"
                                            value={formData.verificationCode}
                                            onChange={(e) => handleInputChange("verificationCode", e.target.value)}
                                            className="h-12 text-base text-center tracking-widest border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                            maxLength={6}
                                            required
                                        />
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-2">Không nhận được mã?</p>
                                        <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                                            Gửi lại mã (30s)
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isLoading || (currentStep === 1 && !formData.agreeTerms)}
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {currentStep === 1 ? "Tiếp tục" : "Hoàn tất đăng ký"}
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </Button>

                            {currentStep === 2 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setCurrentStep(1)}
                                    className="w-full h-12 border-gray-300 hover:bg-gray-50 rounded-xl flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Quay lại
                                </Button>
                            )}
                        </form>

                        {/* Login Link */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Đã có tài khoản?{" "}
                                <button onClick={onSwitchToLogin} className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Đăng nhập ngay
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Default export for the register page
export default function RegisterPage() {
    const handleRegisterSuccess = () => {
        console.log("Register successful")
        // Add navigation logic here
        // router.push('/chat')
    }

    const handleSwitchToLogin = () => {
        // Navigate to login page
        window.location.href = '/auth/login'
    }

    return (
        <RegisterForm
            onSwitchToLogin={handleSwitchToLogin}
            onRegisterSuccess={handleRegisterSuccess}
        />
    )
}
