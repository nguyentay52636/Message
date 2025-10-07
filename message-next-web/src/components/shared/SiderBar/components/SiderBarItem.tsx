import { Button } from '@/components/ui/button'
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
interface SiderBarItemProps {
    item: any
    index: number
}
export default function SiderBarItem({ item, index }: SiderBarItemProps) {
    return (
        <>
            <Tooltip key={index}>
                <TooltipTrigger asChild className="w-full">
                    <div className="relative my-5!">
                        <Button
                            variant="ghost"
                            onClick={item.onClick}
                            className="w-full p-[30px]! p-1  cursor-pointer text-white hover:bg-blue-700! hover:text-white  p-4 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                        >
                            <item.icon className="w-[28px]! hover: h-[28px]! sm:w-10 sm:h-10" />
                        </Button>

                        {item.badge && (
                            <Badge className="absolute -top-3 right-0 bg-red-500 text-white text-xs px-1 py-0.5 h-6 sm:h-5 min-w-4 sm:min-w-5 rounded-full cursor-pointer flex items-center justify-center shadow-lg border-0 px-2 py-4">
                                {item.badge}
                            </Badge>
                        )}
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="hidden md:block">
                    <p>{item.label}</p>
                </TooltipContent>
            </Tooltip>
        </>
    )
}
