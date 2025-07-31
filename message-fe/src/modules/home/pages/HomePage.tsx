import React from 'react'
import { MainContentArea } from '../components/MainContentArea/MainContentArea'
import { useTheme } from '@/components/ui/ThemeProvider'

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <>
      <MainContentArea messages={[]} isDarkMode={theme === 'dark'} />
    </>
  )
}
