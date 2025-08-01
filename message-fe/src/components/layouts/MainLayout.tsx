import React, { PropsWithChildren } from 'react'
import { SiderNavBar } from '../SiderNavBar/SiderNavBar'
import { Outlet } from 'react-router-dom'
import { ChatListPanel } from '@/modules/home/components/ChatListPanel/ChatListPanel'
import { cn } from '@/lib/utils'
import { useSliderTabBar } from './hooks/SliderTabBar'

export default function MainLayout({ children }: PropsWithChildren) {
  const {
    handleToggleMobileSidebar,
  } = useSliderTabBar()

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">
      <div className="hidden lg:flex w-20 flex-shrink-0 z-30">
        <SiderNavBar onToggleMobileSidebar={handleToggleMobileSidebar} />
        {children || <Outlet />}
      </div>
    </div>
  )
}
