"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoginMethod } from "../hooks/useLoginForm"

interface PhoneEmailInputProps {
    loginMethod: LoginMethod
    value: string
    onChange: (value: string) => void
    disabled?: boolean
}

export default function PhoneEmailInput({ loginMethod, value, onChange, disabled }: PhoneEmailInputProps) {
    return (
        <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
                {loginMethod === "phone" ? "Số điện thoại" : "Email"}
            </Label>
            <Input
                type={loginMethod === "phone" ? "tel" : "email"}
                placeholder={loginMethod === "phone" ? "Nhập số điện thoại" : "Nhập email"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                required
                disabled={disabled}
            />
        </div>
    )
}


