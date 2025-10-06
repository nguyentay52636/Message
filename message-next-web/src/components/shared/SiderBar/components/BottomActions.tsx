import { Button } from '@/components/ui/button'
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ModeToggle } from '@/components/Mod/ModeTogger'
import { Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BottomActions() {
  const router = useRouter()
  return (
    <>
      <div className="mt-auto flex flex-col space-y-2 sm:space-y-3 w-full cursor-pointer px-2">
        {/* Theme Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex justify-center">
              <ModeToggle />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="hidden md:block">
            <p>Chuyển đổi giao diện</p>
          </TooltipContent>
        </Tooltip>

        {/* Settings */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push("/settings")}
              variant="ghost"
              size="sm"
              className="w-full px-[30px]! cursor-pointer p-2! text-white! hover:bg-white/20 p-2 sm:p-3 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Settings className="w-[30px]! hover: h-[30px]! sm:w-10 sm:h-10" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="hidden md:block">
            <p>Cài đặt</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  )
}
