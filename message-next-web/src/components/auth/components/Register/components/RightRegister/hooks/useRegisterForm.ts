"use client"

import { useState } from "react"

export type RegisterMethod = "phone" | "email"

export interface RegisterFormData {
  fullName: string
  phoneOrEmail: string
  password: string
  confirmPassword: string
  verificationCode: string
  agreeTerms: boolean
}

export function useRegisterForm() {
  const [registerMethod, setRegisterMethod] = useState<RegisterMethod>("phone")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    phoneOrEmail: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    agreeTerms: false,
  })

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

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "password") {
      calculatePasswordStrength(value as string)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (currentStep === 1) {
      setTimeout(() => {
        setIsLoading(false)
        setCurrentStep(2)
      }, 2000)
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }

  return {
    // state
    registerMethod,
    showPassword,
    showConfirmPassword,
    currentStep,
    isLoading,
    passwordStrength,
    formData,
    // actions
    setRegisterMethod,
    setShowPassword,
    setShowConfirmPassword,
    setCurrentStep,
    handleInputChange,
    handleSubmit,
    getPasswordStrengthText,
  }
}


