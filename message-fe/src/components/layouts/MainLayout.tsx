import SiderNavBar from '@/components/SiderNavBar/SiderNavBar';
import { ChatListPanel } from '@/modules/home/components/ChatListPanel';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../ui/ThemeProvider';
import { ChatProvider, useChat } from '@/modules/home/context/ChatContext';

function MainLayoutContent({ children }: PropsWithChildren) {
  const { theme, setTheme } = useTheme()
  const { selectedUserId, setSelectedUserId, activeTab, setActiveTab } = useChat()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId)
  }

  return (
    <div className={`h-screen w-screen flex overflow-hidden ${theme === 'dark' ? "bg-gray-900" : "bg-gray-100"}`}>
      <div
        className={`absolute md:relative inset-y-0 left-0 z-30 w-140 flex transition-transform duration-300 ease-in-out ${theme === 'dark' ? " bg-gray-800" : "bg-white"
          } shadow-xl md:shadow-lg`}
      >
        <SiderNavBar isDarkMode={theme === 'dark'} toggleTheme={toggleTheme} />
        <div className={`flex-1 flex ${theme === 'dark' ? "bg-gray-700" : "bg-gray-50"}`}>
          <div className="flex-shrink-0">
            <ChatListPanel
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDarkMode={theme === 'dark'}
              selectedUserId={selectedUserId}
              onUserSelect={handleUserSelect}
            />
          </div>
        </div>

      </div>

      <div className={`flex overflow-y-auto ${theme === 'dark' ? "bg-gray-800" : "bg-white"}`}>
        {children || <Outlet />}
      </div>
    </div>

  );
}

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <ChatProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </ChatProvider>
  )
}
