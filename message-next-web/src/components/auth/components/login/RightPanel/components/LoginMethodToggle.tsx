"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { LoginMethod } from "../hooks/useLoginForm"

interface LoginMethodToggleProps {
    loginMethod: LoginMethod
    onChange: (method: LoginMethod) => void
    disabled?: boolean
}

export default function LoginMethodToggle({ loginMethod, onChange, disabled }: LoginMethodToggleProps) {
    return (
        <div className="flex bg-gray-100 rounded-2xl p-1">
            <Button
                variant="outline"
                onClick={() => onChange("phone")}
                className={`flex-1 flex items-center bg-white! justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${loginMethod === "phone" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-800"}`}
                disabled={disabled}
            >
                <Phone className="w-4 h-4" />
                Số điện thoại
            </Button>
            <Button
                variant="outline"
                onClick={() => onChange("email")}
                className={`flex-1 flex items-center justify-center bg-white! gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${loginMethod === "email" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-800"}`}
                disabled={disabled}
            >
                <Mail className="w-4 h-4" />
                Email
            </Button>
        </div>
    )
}


