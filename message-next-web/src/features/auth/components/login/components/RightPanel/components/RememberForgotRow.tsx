"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface RememberForgotRowProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    disabled?: boolean
}

export default function RememberForgotRow({ checked, onCheckedChange, disabled }: RememberForgotRowProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="remember"
                    checked={checked}
                    onCheckedChange={(val) => onCheckedChange(Boolean(val))}
                    disabled={disabled}
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                    Ghi nhớ đăng nhập
                </label>
            </div>
            <Button
                variant="link"
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
                Quên mật khẩu?
            </Button>
        </div>
    )
}


