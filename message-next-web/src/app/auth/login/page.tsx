"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Phone, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { login } from "@/redux/slices/authSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store/store"
interface LoginFormProps {
    onSwitchToRegister: () => void
    onLoginSuccess: () => void
}

export function LoginForm({ onSwitchToRegister, onLoginSuccess }: LoginFormProps) {
    const router = useRouter()
    const navigateToRegister = () => {
        router.push("/auth/register");
    };

    const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone")
    const [showPassword, setShowPassword] = useState(false)
    const [isRememberMe, setIsRememberMe] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const [formData, setFormData] = useState({
        phone: "",
        password: "",
        rememberMe: false,
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.phone && formData.password) {
            setIsLoading(true)
            try {
                const response = await dispatch(login({ phone: formData.phone, password: formData.password })).unwrap();

                console.log('Full login response:', response);

                // Kiểm tra nếu login thành công
                if (response && response.user && response.accessToken) {
                    const userData = response.user;

                    toast.success(`Đăng nhập thành công! Chào mừng ${userData.username}`, {
                    });

                    console.log('User data:', userData);
                    console.log('User role:', userData.vaiTro);
                    console.log('User role name:', userData.vaiTro?.ten);



                } else {


                }
            } catch (err: any) {

            } finally {
                setIsLoading(false)
            }
        }
    }


    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden">
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
                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            Chào mừng trở lại!
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed max-w-md">
                            Kết nối với bạn bè và gia đình thông qua tin nhắn, cuộc gọi và nhiều tính năng thú vị khác
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-6 max-w-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Tin nhắn nhanh chóng</h3>
                                <p className="text-blue-100 text-sm">Gửi tin nhắn, hình ảnh và video tức thì</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Cuộc gọi HD</h3>
                                <p className="text-blue-100 text-sm">Gọi video và voice chất lượng cao</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Bảo mật tuyệt đối</h3>
                                <p className="text-blue-100 text-sm">Mã hóa end-to-end cho mọi cuộc trò chuyện</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
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

                    {/* Login Form */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <form onSubmit={handleSubmitLogin} className="space-y-6">
                            {/* Login Method Toggle */}
                            <div className="flex bg-gray-100 rounded-2xl p-1">
                                <Button
                                    variant='outline'
                                    onClick={() => setLoginMethod("phone")}
                                    className={`flex-1 flex items-center bg-white! justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${loginMethod === "phone" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-800"
                                        }`}
                                >
                                    <Phone className="w-4 h-4" />
                                    Số điện thoại
                                </Button>
                                <Button
                                    variant='outline'
                                    onClick={() => setLoginMethod("email")}
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
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

                    {/* Footer */}
                    <div className="text-center mt-8 text-sm text-gray-500">
                        <p>Bằng việc đăng nhập, bạn đồng ý với</p>
                        <div className="flex justify-center gap-4 mt-1">
                            <Button
                                variant='link'
                                className="hover:text-blue-600"
                            >
                                Điều khoản sử dụng
                            </Button>
                            <span>•</span>
                            <Button
                                variant='link' className="hover:text-blue-600">Chính sách bảo mật</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Default export for Next.js page
export default function LoginPage() {
    const router = useRouter()

    const handleSwitchToRegister = () => {
        router.push('/auth/register')
    }

    const handleLoginSuccess = () => {
        // Handle successful login
        console.log("Login successful")
        // You can add navigation logic here
        // router.push('/chat')
    }

    return <LoginForm onSwitchToRegister={handleSwitchToRegister} onLoginSuccess={handleLoginSuccess} />
}
