"use client"

import { Smile, Send, Mic, Plus, Image, FileText, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MessageInputProps {
    message: string
    setMessage: (message: string) => void
    onSendMessage: () => void
    recipientName?: string
}

export function ChatInput({ message, setMessage, onSendMessage, recipientName }: MessageInputProps) {
    return (
        <div className="px-4 py-4 bg-background/95 backdrop-blur-sm border-t border-border/50">
            {/* Message Input Row */}
            <div className="flex items-center gap-3 w-full">
                {/* Left Action Buttons */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2.5 rounded-xl transition-all hover:scale-105 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                        <Smile className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2.5 rounded-xl transition-all hover:scale-105 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                        <Image className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2.5 rounded-xl transition-all hover:scale-105 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                        <FileText className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2.5 rounded-xl transition-all hover:scale-105 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                        <Type className="w-5 h-5" />
                    </Button>
                </div>

                {/* Input Field */}
                <div className="flex-1 relative min-w-0">
                    <Input
                        placeholder={recipientName ? `Nhập @, tin nhắn tới ${recipientName}` : "Nhập tin nhắn..."}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
                        className="w-full h-12 rounded-2xl border-2 focus:ring-2 focus:ring-ring transition-all pr-12 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-ring focus:shadow-lg"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent"
                        >
                            <Smile className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent"
                        >
                            <Mic className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                        onClick={onSendMessage}
                        disabled={!message.trim()}
                        className={`p-3 rounded-2xl transition-all hover:scale-105 shadow-lg flex-shrink-0 ${message.trim()
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                            }`}
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
