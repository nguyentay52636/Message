import React from 'react'
// import { MainContentArea } from '../components/MainContentArea/MainContentArea'
import { useTheme } from '@/components/ui/ThemeProvider'
import { useChat } from '../context/ChatContext'
import { chatData } from '../components/MainContentArea/components/Mock/DataChat'

export default function HomePage() {
  const { theme } = useTheme()
  const { selectedUserId } = useChat()

  // Lấy tin nhắn của user được chọn
  const messages = selectedUserId ? (chatData[selectedUserId] || []) : []

  return (
    <>
      {/* <MainContentArea messages={messages} isDarkMode={theme === 'dark'} /> */}
    </>
  )
}
