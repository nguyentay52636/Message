import { Button } from '@/components/ui/button'
import React from 'react'

export default function FooterLogin() {
  return (
    <>
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
    </>
  )
}
