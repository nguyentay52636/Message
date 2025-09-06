"use client"

import { Search, ArrowLeft } from "lucide-react"
import React, { useEffect, useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FindUserByPhone } from "@/apis/friendsRequestApi"
import ResponeUser from "../Respone/ResponeUser"
import { IUser } from "@/types/types"
import { ChatAreaWithUser } from "@/chat/components/ChatArea/ChatAreaWithUser"
import { Message } from "@/lib/Mock/dataMock"
import { MainWindownChat } from "@/chat/ChatUpdate/MainWindownChat"

interface SearchUserProps {
  onBack: () => void
}

export default function SearchUser({ onBack }: SearchUserProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<IUser | null>(null)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  console.log("SearchUser render - selectedUser:", selectedUser)

  const onSendMessage = () => {
    setMessage("")
  }

  useEffect(() => {
    console.log("selectedUser changed to:", selectedUser);
  }, [selectedUser])

  const handleUserSelect = useCallback((u: IUser) => {
    console.log("SearchUser - handleUserSelect called with user:", u);
    setSelectedUser(u);
    console.log("SearchUser - selectedUser should be set");
  }, [])

  useEffect(() => {
    if (!searchQuery) {
      setSearchResult(null)
      return
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true)
        const res = await FindUserByPhone(searchQuery)
        console.log(res)
        if (res && res.length > 0) {
          setSearchResult(res[0])
        } else {
          setSearchResult(null)
        }
      } catch (error) {
        console.error(error)
        setSearchResult(null)
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(delay)
  }, [searchQuery])

  console.log("Rendering - selectedUser exists:", !!selectedUser);

  return (
    <div className="">
      {!selectedUser ? (
        <div className="p-4 border-b border-border">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2 rounded-xl hover:bg-accent"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Tìm bạn</h1>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Nhập số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 rounded-xl bg-muted/50"
            />
          </div>

          <ResponeUser
            user={searchResult}
            loading={loading}
            searchQuery={searchQuery}
            onSelectUser={handleUserSelect}
          />
        </div>
      ) : (
        <div className="h-full w-full border-2 border-red-500 bg-blue-50">
          <MainWindownChat
            messages={messages}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            message={message}
            setMessage={setMessage}
            onSendMessage={onSendMessage}
            recipientName={selectedUser.username}
            user={selectedUser}
            onBack={() => setSelectedUser(null)}
          />
        </div>
      )}
    </div>
  )
}