"use client"

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'

interface TermsAgreementProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

export default function TermsAgreement({ checked, onCheckedChange }: TermsAgreementProps) {
    return (
        <div className="flex items-start space-x-3">
            <Checkbox
                id="terms"
                checked={!!checked}
                onCheckedChange={(checkedVal) => onCheckedChange(!!checkedVal)}
                className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                Tôi đồng ý với{" "}
                <button type="button" className="text-blue-400 hover:text-blue-500 font-semibold">Điều khoản sử dụng</button>{" "}
                và{" "}
                <button type="button" className="text-blue-400 hover:text-blue-500 font-semibold">Chính sách bảo mật</button>{" "}
                của Zalo
            </label>
        </div>
    )
}


