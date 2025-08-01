import { useEffect, useState } from "react"

interface UseSliderTabBarReturn {
  selectedChat: string | null
  setSelectedChat: (chatId: string) => void
  isMobileSidebarOpen: boolean
  setIsMobileSidebarOpen: (open: boolean) => void
  sidebarWidth: number
  isResizing: boolean
  handleChatSelect: (chatId: string) => void
  handleToggleMobileSidebar: () => void
  handleMouseDown: (e: React.MouseEvent) => void
}

export const useSliderTabBar = (): UseSliderTabBarReturn => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(320) // Default width
  const [isResizing, setIsResizing] = useState(false)

  // Responsive sidebar width based on screen size
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth

      // Adjust sidebar width based on screen size
      if (screenWidth <= 1366) {
        setSidebarWidth(280) // Smaller width for low resolution
      } else if (screenWidth <= 1600) {
        setSidebarWidth(320) // Default width
      } else {
        setSidebarWidth(400) // Larger width for high resolution
      }
    }

    handleResize() // Set initial width
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleChatSelect = (chatId: string) => {
    console.log("MainLayout: Chat selected:", chatId)
    setSelectedChat(chatId)

    // Close mobile sidebar when chat is selected
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(false)
    }
  }

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  // Handle sidebar resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = e.clientX - 64 // Subtract navigation strip width
      const minWidth = 240 // Minimum sidebar width
      const maxWidth = Math.min(500, window.innerWidth * 0.4) // Maximum 40% of screen width

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isResizing])

  return {
    selectedChat,
    setSelectedChat,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    sidebarWidth,
    isResizing,
    handleChatSelect,
    handleToggleMobileSidebar,
    handleMouseDown,
  }
}
