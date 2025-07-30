import { SiderNavBar } from '@/components/SiderNavBar';
import { PropsWithChildren, useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout({ children }: PropsWithChildren) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div>
      <div className={`h-screen w-screen flex overflow-hidden bg-gray-900`}>
        {/* Sidebar - Absolute positioning để không ảnh hưởng main content */}
        <SiderNavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        {children || <Outlet />}
      </div>
    </div>
  );
}
