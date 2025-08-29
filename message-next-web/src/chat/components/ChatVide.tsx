import React from 'react'

export default function ChatVide() {
    return (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-muted/10 via-background to-muted/20">
            <div className="text-center p-4 sm:p-8 max-w-md">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg border border-primary/10">
                    <svg className="w-8 h-8 sm:w-12 sm:h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground">Chọn một cuộc trò chuyện</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Chọn một người từ danh sách để bắt đầu cuộc trò chuyện
                </p>
            </div>
        </div>
    )
}
