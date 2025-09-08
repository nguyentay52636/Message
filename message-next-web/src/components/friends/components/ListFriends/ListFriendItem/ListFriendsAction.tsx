import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, MoreHorizontal, Phone, Users, Video } from 'lucide-react'
import InformationAccount from '@/components/profile/InformationAccount/InformationAccount'

export default function ListFriendsAction() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className=" cursor-pointer rounded-xl hover:bg-gray-300">
          <MessageCircle className="w-20 h-20" />
        </Button>
        <Button variant="ghost" size="icon" className="p-2 cursor-pointer rounded-xl hover:bg-gray-300">
          <Phone className="w-20 h-20" />
        </Button>
        <Button variant="ghost" size="icon" className="p-2 cursor-pointer rounded-xl hover:bg-gray-300">
          <Video className="w-20 h-20" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="p-2 cursor-pointer rounded-xl hover:bg-gray-300">
              <MoreHorizontal className="w-20 h-20" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleOpen}>Xem thông tin chi tiết</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Phân loại</DropdownMenuItem>
            <DropdownMenuItem>Đặt tên gợi nhớ</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Chặn người này</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Xoá bạn bè</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <InformationAccount isOpen={open} onClose={handleClose} />
    </>
  )
}
