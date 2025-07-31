import React, { PropsWithChildren, useState } from 'react'
import { SiderNavBar } from '../SiderNavBar/SiderNavBar'
import { Outlet } from 'react-router-dom'
export default function MainLayout({ children }: PropsWithChildren) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">
      <div className="hidden lg:flex w-16 flex-shrink-0 z-30">
        <SiderNavBar onToggleMobileSidebar={handleToggleMobileSidebar} />
      </div>

      <div>
        {children || <Outlet />}
      </div>
    </div>
  )
}
