"use client"

import { useId } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { Label } from "@/components/ui/label"

interface PasswordInputProps {
    value: string
    onChange: (value: string) => void
    showPassword: boolean
    onToggleShow: () => void
    disabled?: boolean
}

export default function PasswordInput({ value, onChange, showPassword, onToggleShow, disabled }: PasswordInputProps) {
    const inputId = useId()
    return (
        <div className="space-y-2">
            <Label htmlFor={inputId} className="text-sm font-semibold text-gray-700">Mật khẩu</Label>
            <div className="relative">
                <Input
                    id={inputId}
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-12 rounded-xl"
                    required
                    disabled={disabled}
                />
                <Button
                    variant="ghost"
                    onClick={onToggleShow}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={disabled}
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
            </div>
        </div>
    )
}


