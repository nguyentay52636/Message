"use client"

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { registerAPI, verifyOTPAPI, resendOTPAPI } from '@/apis/authApi'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const registerSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    username: z.string().min(2, "Tên người dùng phải có ít nhất 2 ký tự"),
    phone: z.string().min(10, "Số điện thoại không hợp lệ"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val: boolean) => val === true, "Bạn phải đồng ý với điều khoản sử dụng")
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"]
})

type RegisterFormData = z.infer<typeof registerSchema>

interface FormRegisterProps {
    onSwitchToLogin: () => void
    onRegisterSuccess: () => void
}

export default function FormRegister({ onSwitchToLogin, onRegisterSuccess }: FormRegisterProps) {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [otp, setOtp] = useState("")
    const [countdown, setCountdown] = useState(0)
    const [registrationData, setRegistrationData] = useState<Partial<RegisterFormData> | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            username: "",
            phone: "",
            password: "",
            confirmPassword: "",
            agreeTerms: false,
        }
    })

    const watchedPassword = watch("password")
    const watchedAgreeTerms = watch("agreeTerms")
    const watchedEmail = watch("email")
    const watchedUsername = watch("username")
    const watchedPhone = watch("phone")
    const watchedConfirmPassword = watch("confirmPassword")

    const isFormValid = () => {
        return (
            watchedEmail &&
            watchedUsername &&
            watchedPhone &&
            watchedPassword &&
            watchedConfirmPassword &&
            watchedAgreeTerms &&
            watchedPassword === watchedConfirmPassword &&
            watchedPassword.length >= 8 &&
            watchedUsername.length >= 2 &&
            watchedPhone.length >= 10
        )
    }

    React.useEffect(() => {
        if (watchedPassword) {
            calculatePasswordStrength(watchedPassword)
        }
    }, [watchedPassword])

    // Countdown timer for resend OTP
    React.useEffect(() => {
        let timer: NodeJS.Timeout
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [countdown])

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

    const onSubmitStep1 = async (data: Partial<RegisterFormData>) => {
        try {
            setIsLoading(true)

            // Validate form trước khi chuyển sang step 2
            const isValid = await trigger()
            if (!isValid) {
                toast.error("Vui lòng kiểm tra lại thông tin đã nhập")
                return
            }

            // Gọi API đăng ký để lấy OTP
            const response = await registerAPI({
                email: data.email || "",
                username: data.username || "",
                phone: data.phone || "",
                password: data.password || ""
            })

            // Lưu dữ liệu từ step 1
            setRegistrationData(data)
            setValue("email", data.email || "")
            setValue("username", data.username || "")
            setValue("phone", data.phone || "")
            setValue("password", data.password || "")
            setValue("confirmPassword", data.confirmPassword || "")
            setValue("agreeTerms", data.agreeTerms || false)

            // Bắt đầu countdown cho resend OTP
            setCountdown(30)

            // Chuyển sang step 2
            setCurrentStep(2)
            toast.success("Mã OTP đã được gửi đến email của bạn!")

        } catch (error: unknown) {
            console.error("Error in step 1:", error)
            const errorMessage = error instanceof Error ? error.message : "Đăng ký thất bại. Vui lòng thử lại."
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const onSubmitStep2 = async () => {
        try {
            if (!otp || otp.length !== 6) {
                toast.error("Vui lòng nhập mã OTP 6 số")
                return
            }

            setIsLoading(true)

            // Gọi API xác thực OTP
            const response = await verifyOTPAPI({
                email: registrationData?.email || "",
                otp: otp
            })

            toast.success("Đăng ký thành công! Tài khoản đã được kích hoạt.")
            onRegisterSuccess()

        } catch (error: unknown) {
            console.error("OTP verification error:", error)
            const errorMessage = error instanceof Error ? error.message : "Xác thực OTP thất bại. Vui lòng thử lại."
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOTP = async () => {
        try {
            if (!registrationData?.email) {
                toast.error("Không tìm thấy email để gửi lại OTP")
                return
            }

            setIsLoading(true)
            await resendOTPAPI({ email: registrationData.email })

            // Reset countdown
            setCountdown(30)
            toast.success("Đã gửi lại mã OTP. Vui lòng kiểm tra email.")

        } catch (error: unknown) {
            console.error("Resend OTP error:", error)
            const errorMessage = error instanceof Error ? error.message : "Gửi lại OTP thất bại. Vui lòng thử lại."
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const handleFormSubmit = async (data: RegisterFormData) => {
        if (currentStep === 1) {
            await onSubmitStep1(data)
        } else {
            await onSubmitStep2()
        }
    }

    const handleBackToStep1 = () => {
        setCurrentStep(1)
        setOtp("")
        setCountdown(0)
    }

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
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

            {/* Form Completion Indicator */}
            {currentStep === 1 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-700">Tiến độ hoàn thành form:</span>
                        <span className="text-blue-600 font-semibold">
                            {Math.round((isFormValid() ? 1 : 0) * 100)}%
                        </span>
                    </div>
                    <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(isFormValid() ? 1 : 0) * 100}%` }}
                        ></div>
                    </div>

                    {/* Debug Info - Remove this in production */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-3 pt-3 border-t border-blue-200 text-xs text-blue-600">
                            <div>Email: {watchedEmail ? '✓' : '✗'}</div>
                            <div>Username: {watchedUsername && watchedUsername.length >= 2 ? '✓' : '✗'}</div>
                            <div>Phone: {watchedPhone && watchedPhone.length >= 10 ? '✓' : '✗'}</div>
                            <div>Password: {watchedPassword && watchedPassword.length >= 8 ? '✓' : '✗'}</div>
                            <div>Confirm: {watchedPassword === watchedConfirmPassword ? '✓' : '✗'}</div>
                            <div>Terms: {watchedAgreeTerms ? '✓' : '✗'}</div>
                        </div>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                {currentStep === 1 ? (
                    <>
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Email</label>
                            <Input
                                {...register("email")}
                                type="email"
                                placeholder="Nhập địa chỉ email"
                                className={`h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Tên người dùng</label>
                            <Input
                                {...register("username")}
                                type="text"
                                placeholder="Nhập tên người dùng"
                                className={`h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl ${errors.username ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                    }`}
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500">{errors.username.message}</p>
                            )}
                            {watchedUsername && (
                                <div className="flex justify-between items-center">
                                    <span className={`text-xs ${watchedUsername.length < 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                                        {watchedUsername.length < 2 ? 'Cần ít nhất 2 ký tự' : '✓ Hợp lệ'}
                                    </span>
                                    <span className="text-xs text-gray-500">{watchedUsername.length}/2</span>
                                </div>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Số điện thoại</label>
                            <Input
                                {...register("phone")}
                                type="tel"
                                placeholder="Nhập số điện thoại (VD: 0123456789)"
                                className={`h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                    }`}
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone.message}</p>
                            )}
                            {watchedPhone && watchedPhone.length < 10 && (
                                <p className="text-sm text-yellow-600">Số điện thoại phải có ít nhất 10 số</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-semibold text-gray-700">Mật khẩu</label>
                            <div className="relative">
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                                    className={`h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-12 rounded-xl ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                        }`}
                                />
                                <Button
                                    variant='ghost'
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </Button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                            {watchedPassword && (
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
                                    {...register("confirmPassword")}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Nhập lại mật khẩu"
                                    className={`h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-12 rounded-xl ${errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                        }`}
                                />
                                <Button
                                    variant='ghost'
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </Button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Terms Agreement */}
                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="terms"
                                checked={!!watchedAgreeTerms}
                                onCheckedChange={(checked) => setValue("agreeTerms", checked as boolean)}
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
                        {errors.agreeTerms && (
                            <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>
                        )}
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
                            <p className="font-semibold text-gray-900 text-lg">{registrationData?.email}</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Mã xác thực</label>
                            <Input
                                type="text"
                                placeholder="Nhập mã 6 số"
                                className="h-12 text-base text-center tracking-widest border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            />
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Không nhận được mã?</p>
                            <button
                                type="button"
                                onClick={handleResendOTP}
                                disabled={countdown > 0 || isLoading}
                                className={`text-sm font-semibold ${countdown > 0
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-blue-600 hover:text-blue-700'
                                    }`}
                            >
                                {countdown > 0 ? `Gửi lại mã (${countdown}s)` : 'Gửi lại mã'}
                            </button>
                        </div>
                    </>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading || (currentStep === 1 && !isFormValid()) || (currentStep === 2 && !otp)}
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
                        onClick={handleBackToStep1}
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
                    <Button variant="link" onClick={onSwitchToLogin} className="text-blue-600 hover:text-blue-700 font-semibold">
                        Đăng nhập ngay
                    </Button>
                </p>
            </div>
        </div>
    )
}