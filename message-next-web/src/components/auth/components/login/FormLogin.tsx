"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { login, clearError } from "@/redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store/store"
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Phone, Mail, ArrowRight } from 'lucide-react'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Alert } from "@/components/ui/alert"

interface FormLoginProps {
    onSwitchToRegister: () => void
    onLoginSuccess: () => void
}

export default function FormLogin({ onSwitchToRegister, onLoginSuccess }: FormLoginProps) {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth)

    const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone")
    const [showPassword, setShowPassword] = useState(false)
    const [isRememberMe, setIsRememberMe] = useState(false)

    const [formData, setFormData] = useState({
        phone: "",
        password: "",
        rememberMe: false,
    })

    useEffect(() => {
        router.prefetch("/chat")
    }, [router])

    // Update form field name based on login method
    const handleLoginMethodChange = (method: "phone" | "email") => {
        setLoginMethod(method);
        // Clear the input field when switching methods
        setFormData(prev => ({ ...prev, phone: "" }));
        // Clear saved credentials
        localStorage.removeItem('savedPhone');
        localStorage.removeItem('savedEmail');
    }

    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Form validation
        if (!formData.phone.trim()) {
            toast.error("Vui lòng nhập số điện thoại hoặc email");
            return;
        }

        if (loginMethod === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.phone.trim())) {
                toast.error("Vui lòng nhập email hợp lệ");
                return;
            }
        } else if (loginMethod === "phone") {
            const phoneRegex = /^[0-9]{10,11}$/;
            if (!phoneRegex.test(formData.phone.trim())) {
                toast.error("Vui lòng nhập số điện thoại hợp lệ (10-11 số)");
                return;
            }
        }

        if (!formData.password.trim()) {
            toast.error("Vui lòng nhập mật khẩu");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        try {
            const loginData = loginMethod === "phone"
                ? { phone: formData.phone.trim(), password: formData.password }
                : { email: formData.phone.trim(), password: formData.password };

            const response = await dispatch(login(loginData)).unwrap();

            console.log('Full login response:', response);

            const resolvedUser = response?.user
                || response?.data?.user
                || response?.currentUser
                || response?.data?.currentUser
                || response?.userData;
            const resolvedToken = response?.accessToken
                || response?.token
                || response?.data?.accessToken
                || response?.data?.token
                || response?.jwt;

            if (response && resolvedUser && resolvedToken) {
                const userData = resolvedUser as any;
                const displayName = userData?.username || userData?.name || userData?.email || '';

                toast.success(`Đăng nhập thành công! Chào mừng ${displayName}`, {
                    duration: 3000,
                });

                console.log('User data:', userData);
                console.log('User role:', userData.vaiTro);
                console.log('User role name:', userData.vaiTro?.ten);

                // Save credentials if remember me is checked
                if (formData.rememberMe) {
                    if (loginMethod === "phone") {
                        localStorage.setItem('savedPhone', formData.phone.trim());
                    } else {
                        localStorage.setItem('savedEmail', formData.phone.trim());
                    }
                }

                router.replace("/strager-chat");

                onLoginSuccess();
            } else {
                toast.error("Đăng nhập thất bại - Dữ liệu không hợp lệ");
            }
        } catch (err: unknown) {
            console.error('Login error:', err);
            const errorMessage = (typeof err === 'object' && err !== null && 'message' in err)
                ? String((err as { message?: string }).message)
                : "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";
            toast.error(errorMessage);
        }
    }

    // Chuyển hướng nếu đã đăng nhập
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/strager-chat");
        }
    }, [isAuthenticated, router]);

    // Load saved credentials if remember me was checked
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedPhone = localStorage.getItem('savedPhone');
            const savedEmail = localStorage.getItem('savedEmail');
            const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

            if (savedRememberMe) {
                if (savedPhone) {
                    setFormData(prev => ({
                        ...prev,
                        phone: savedPhone,
                        rememberMe: true
                    }));
                    setIsRememberMe(true);
                    setLoginMethod("phone");
                } else if (savedEmail) {
                    setFormData(prev => ({
                        ...prev,
                        phone: savedEmail,
                        rememberMe: true
                    }));
                    setIsRememberMe(true);
                    setLoginMethod("email");
                }
            }
        }
    }, []);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // Clear error when user starts typing
        if (field === 'phone' || field === 'password') {
            dispatch(clearError());
        }

        // Save phone when remember me is checked
        if (field === 'rememberMe' && value === true) {
            localStorage.setItem('rememberMe', 'true');
        } else if (field === 'rememberMe' && value === false) {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('savedPhone');
            localStorage.removeItem('savedEmail');
        } else if (field === 'phone' && formData.rememberMe) {
            if (loginMethod === "phone") {
                localStorage.setItem('savedPhone', value as string);
            } else {
                localStorage.setItem('savedEmail', value as string);
            }
        }
    }

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmitLogin} className="space-y-6">
                {/* Login Method Toggle */}
                <div className="flex bg-gray-100 rounded-2xl p-1">
                    <Button
                        variant='outline'
                        onClick={() => handleLoginMethodChange("phone")}
                        className={`flex-1 flex items-center bg-white! justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${loginMethod === "phone" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-800"
                            }`}
                    >
                        <Phone className="w-4 h-4" />
                        Số điện thoại
                    </Button>
                    <Button
                        variant='outline'
                        onClick={() => handleLoginMethodChange("email")}
                        className={`flex-1 flex items-center justify-center bg-white! gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${loginMethod === "email" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-800"
                            }`}
                    >
                        <Mail className="w-4 h-4" />
                        Email
                    </Button>
                </div>

                {/* Phone/Email Input */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                        {loginMethod === "phone" ? "Số điện thoại" : "Email"}
                    </Label>
                    <Input
                        type={loginMethod === "phone" ? "tel" : "email"}
                        placeholder={loginMethod === "phone" ? "Nhập số điện thoại" : "Nhập email"}
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                        required
                        disabled={isLoading}
                    />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Mật khẩu</Label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-12 rounded-xl"
                            required
                            disabled={isLoading}
                        />
                        <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            disabled={isLoading}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={formData.rememberMe}
                            onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                            disabled={isLoading}
                        />
                        <label htmlFor="remember" className="text-sm text-gray-600">
                            Ghi nhớ đăng nhập
                        </label>
                    </div>
                    <Button
                        variant='link'
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Quên mật khẩu?
                    </Button>
                </div>

                {/* Login Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
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

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Hoặc đăng nhập bằng</span>
                    </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="h-12 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 bg-transparent rounded-xl"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Google
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="h-12 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 bg-transparent rounded-xl"
                    >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                    </Button>
                </div>
            </form>

            {/* Register Link */}
            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Chưa có tài khoản?{" "}
                    <Button
                        variant='link'
                        onClick={onSwitchToRegister}
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Đăng ký ngay
                    </Button>
                </p>
            </div>
        </div>
    )
}
