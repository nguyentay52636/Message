"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { registerAPI, verifyOTPAPI, resendOTPAPI } from '@/apis/authApi'
import { toast } from 'sonner'

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

export type RegisterFormData = z.infer<typeof registerSchema>

export function useRegisterForm() {
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

    useEffect(() => {
        if (watchedPassword) {
            calculatePasswordStrength(watchedPassword)
        }
    }, [watchedPassword])

    // Countdown timer for resend OTP
    useEffect(() => {
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
            const isValid = await trigger()
            if (!isValid) {
                toast.error("Vui lòng kiểm tra lại thông tin đã nhập")
                return
            }
            await registerAPI({
                email: data.email || "",
                username: data.username || "",
                phone: data.phone || "",
                password: data.password || ""
            })
            setRegistrationData(data)
            setValue("email", data.email || "")
            setValue("username", data.username || "")
            setValue("phone", data.phone || "")
            setValue("password", data.password || "")
            setValue("confirmPassword", data.confirmPassword || "")
            setValue("agreeTerms", data.agreeTerms || false)
            setCountdown(30)
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
            await verifyOTPAPI({
                email: registrationData?.email || "",
                otp: otp
            })
            toast.success("Đăng ký thành công! Tài khoản đã được kích hoạt.")
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

    return {
        state: {
            showPassword,
            showConfirmPassword,
            currentStep,
            isLoading,
            passwordStrength,
            otp,
            countdown,
            registrationData,
            watchedPassword,
            watchedAgreeTerms,
            watchedEmail,
            watchedUsername,
            watchedPhone,
            watchedConfirmPassword,
            errors,
        },
        actions: {
            setShowPassword,
            setShowConfirmPassword,
            setOtp,
            setValue,
            handleSubmit,
            handleFormSubmit,
            handleBackToStep1,
            handleResendOTP,
        },
        helpers: {
            register,
            isFormValid,
            getPasswordStrengthText,
        }
    }
}


