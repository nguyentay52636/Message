"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu  >
            <DropdownMenuTrigger asChild className="mx-2">
                <Button
                    variant="ghost"
                    onClick={() => { }}
                    className="w-full p-[30px]!  cursor-pointer text-white hover:bg-white/10 hover:text-white  p-4 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-105">
                    <Sun className=" scale-100  rotate-0 transition-all dark:scale-0 dark:-rotate-90 w-[30px]! hover: h-[30px]! sm:w-10 sm:h-10" />
                    <Moon className="absolute w-[30px]! hover: h-[30px]! sm:w-10 sm:h-10 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 w-[30px]! hover: h-[30px]! sm:w-10 sm:h-10" />
                    <span className="sr-only">Chuyển đổi màu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Sáng
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Tối
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu >
    )
}
