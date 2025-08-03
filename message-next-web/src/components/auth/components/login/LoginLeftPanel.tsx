import React from 'react'

export default function LoginLeftPanel() {
    return (
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                <div className="absolute bottom-32 left-32 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
                {/* Logo */}
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 3-.35 4.31-.99l3.91 1.99c.39.2.85-.13.85-.56v-3.6C22.35 17.2 23 14.7 23 12c0-5.52-4.48-10-11-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                </div>

                {/* Welcome Text */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Chào mừng trở lại!
                    </h1>
                    <p className="text-xl text-blue-100 leading-relaxed max-w-md">
                        Kết nối với bạn bè và gia đình thông qua tin nhắn, cuộc gọi và nhiều tính năng thú vị khác
                    </p>
                </div>

                {/* Features */}
                <div className="space-y-6 max-w-md">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Tin nhắn nhanh chóng</h3>
                            <p className="text-blue-100 text-sm">Gửi tin nhắn, hình ảnh và video tức thì</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Cuộc gọi HD</h3>
                            <p className="text-blue-100 text-sm">Gọi video và voice chất lượng cao</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Bảo mật tuyệt đối</h3>
                            <p className="text-blue-100 text-sm">Mã hóa end-to-end cho mọi cuộc trò chuyện</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
