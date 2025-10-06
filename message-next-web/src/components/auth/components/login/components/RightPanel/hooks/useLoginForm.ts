"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { AppDispatch, RootState } from "@/redux/store/store"
import { clearError, login } from "@/redux/slices/authSlice"

export type LoginMethod = "phone" | "email"

export interface UseLoginFormOptions {
  onLoginSuccess: () => void
}

export function useLoginForm({ onLoginSuccess }: UseLoginFormOptions) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const [loginMethod, setLoginMethod] = useState<LoginMethod>("phone")
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

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/strager-chat")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPhone = localStorage.getItem("savedPhone")
      const savedEmail = localStorage.getItem("savedEmail")
      const savedRememberMe = localStorage.getItem("rememberMe") === "true"

      if (savedRememberMe) {
        if (savedPhone) {
          setFormData((prev) => ({ ...prev, phone: savedPhone, rememberMe: true }))
          setIsRememberMe(true)
          setLoginMethod("phone")
        } else if (savedEmail) {
          setFormData((prev) => ({ ...prev, phone: savedEmail, rememberMe: true }))
          setIsRememberMe(true)
          setLoginMethod("email")
        }
      }
    }
  }, [])

  const handleLoginMethodChange = (method: LoginMethod) => {
    setLoginMethod(method)
    setFormData((prev) => ({ ...prev, phone: "" }))
    localStorage.removeItem("savedPhone")
    localStorage.removeItem("savedEmail")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "phone" || field === "password") {
      dispatch(clearError())
    }

    if (field === "rememberMe" && value === true) {
      localStorage.setItem("rememberMe", "true")
    } else if (field === "rememberMe" && value === false) {
      localStorage.removeItem("rememberMe")
      localStorage.removeItem("savedPhone")
      localStorage.removeItem("savedEmail")
    } else if (field === "phone" && formData.rememberMe) {
      if (loginMethod === "phone") {
        localStorage.setItem("savedPhone", value as string)
      } else {
        localStorage.setItem("savedEmail", value as string)
      }
    }
  }

  const validate = () => {
    if (!formData.phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại hoặc email")
      return false
    }
    if (loginMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.phone.trim())) {
        toast.error("Vui lòng nhập email hợp lệ")
        return false
      }
    } else if (loginMethod === "phone") {
      const phoneRegex = /^[0-9]{10,11}$/
      if (!phoneRegex.test(formData.phone.trim())) {
        toast.error("Vui lòng nhập số điện thoại hợp lệ (10-11 số)")
        return false
      }
    }
    if (!formData.password.trim()) {
      toast.error("Vui lòng nhập mật khẩu")
      return false
    }
    if (formData.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự")
      return false
    }
    return true
  }

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const loginData =
        loginMethod === "phone"
          ? { phone: formData.phone.trim(), password: formData.password }
          : { email: formData.phone.trim(), password: formData.password }

      const response = await dispatch(login(loginData)).unwrap()

      const resolvedUser =
        response?.user ||
        response?.data?.user ||
        response?.currentUser ||
        response?.data?.currentUser ||
        response?.userData
      const resolvedToken =
        response?.accessToken ||
        response?.token ||
        response?.data?.accessToken ||
        response?.data?.token ||
        response?.jwt

      if (response && resolvedUser && resolvedToken) {
        const userData = resolvedUser as any
        const displayName = userData?.username || userData?.name || userData?.email || ""

        toast.success(`Đăng nhập thành công! Chào mừng ${displayName}`, { duration: 3000 })

        if (formData.rememberMe) {
          if (loginMethod === "phone") {
            localStorage.setItem("savedPhone", formData.phone.trim())
          } else {
            localStorage.setItem("savedEmail", formData.phone.trim())
          }
        }

        router.replace("/strager-chat")
        onLoginSuccess()
      } else {
        toast.error("Đăng nhập thất bại - Dữ liệu không hợp lệ")
      }
    } catch (err: unknown) {
      const errorMessage =
        typeof err === "object" && err !== null && "message" in err
          ? String((err as { message?: string }).message)
          : "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."
      toast.error(errorMessage)
    }
  }

  return {
    state: {
      formData,
      loginMethod,
      showPassword,
      isRememberMe,
      isLoading,
    },
    actions: {
      setShowPassword,
      setIsRememberMe,
      handleLoginMethodChange,
      handleInputChange,
      handleSubmitLogin,
    },
  }
}


