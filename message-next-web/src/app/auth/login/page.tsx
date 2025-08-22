"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { login, clearError } from "@/redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store/store"
import FormInput from "@/components/auth/components/login/FormInput"
import FooterLogin from "@/components/auth/components/login/FooterLogin"
import LeftPanelLogin from "@/components/auth/components/login/LeftPanel/LeftPanelLogin"
import { Alert } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"

interface LoginFormProps {
    onSwitchToRegister: () => void
    onLoginSuccess: () => void
}

function LoginForm({ onSwitchToRegister, onLoginSuccess }: LoginFormProps) {
    const router = useRouter()


    const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone")
    const [showPassword, setShowPassword] = useState(false)
    const [isRememberMe, setIsRememberMe] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth)

    const [formData, setFormData] = useState({
        phone: "",
        password: "",
        rememberMe: false,
    })

    // Prefetch chat route for faster navigation after login
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

                router.replace("/chat");

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
            router.push("/chat");
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
        <div className="min-h-screen flex relative">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
                        <Spinner size="lg" className="text-blue-600" />
                        <p className="text-gray-700 font-medium">Đang đăng nhập...</p>
                    </div>
                </div>
            )}

            <LeftPanelLogin />

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
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

                    {/* Error Display */}
                    {error && (
                        <Alert
                            variant="destructive"
                            title="Lỗi đăng nhập"
                            className="mb-4"
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Login Form */}
                    <FormInput
                        onSubmit={(data) => {
                            setFormData(data);
                            // FormInput sẽ tự động gọi handleSubmitLogin thông qua form submit
                        }}
                        isLoading={isLoading}
                        loginMethod={loginMethod}
                        setLoginMethod={handleLoginMethodChange}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        handleSubmitLogin={handleSubmitLogin}
                        onSwitchToRegister={onSwitchToRegister}
                    />

                    {/* Footer */}
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
