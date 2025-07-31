import SiderNavBar from '@/components/SiderNavBar/SiderNavBar';
import { ChatListPanel } from '@/modules/home/components/ChatListPanel';
import { PropsWithChildren, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../ui/ThemeProvider';

export default function MainLayout({ children }: PropsWithChildren) {

  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (

    <div className={`h-screen w-screen flex overflow-hidden ${theme === 'dark' ? "bg-gray-900" : "bg-gray-100"}`}>
      <div
        className={`absolute md:relative inset-y-0 left-0 z-30 w-100 flex transition-transform duration-300 ease-in-out ${theme === 'dark' ? " bg-gray-800" : "bg-white"
          } shadow-xl md:shadow-lg`}
      >
        <SiderNavBar isDarkMode={theme === 'dark'} toggleTheme={toggleTheme} />
        <div className={`flex-1 flex flex-col ${theme === 'dark' ? "bg-gray-700" : "bg-gray-50"}`}>
          <div className="flex-shrink-0">
            <ChatListPanel activeTab="all" setActiveTab={() => { }} isDarkMode={theme === 'dark'} />
          </div>
          <div className={`flex-1 overflow-y-auto ${theme === 'dark' ? "bg-gray-800" : "bg-white"}`}>
            {children || <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
}
