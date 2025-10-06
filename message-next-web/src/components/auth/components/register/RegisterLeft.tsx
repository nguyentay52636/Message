import React from 'react'

export default function RegisterLeft() {
    return (
        <div className="lg:flex lg:w-1/2  bg-[url('/zalo-bg.png')]! bg-cover bg-center bg-no-repeat">
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
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                        Tham gia Zalo ngay!
                    </h1>
                    <p className="text-xl text-purple-100 leading-relaxed max-w-md">
                        Tạo tài khoản để bắt đầu kết nối với bạn bè và khám phá thế giới trò chuyện thú vị
                    </p>
                </div>

                {/* Benefits */}
                <div className="space-y-6 max-w-md">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0 a5.002 5.002 0 009.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Kết nối bạn bè</h3>
                            <p className="text-purple-100 text-sm">Tìm và kết nối với bạn bè dễ dàng</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Chia sẻ khoảnh khắc</h3>
                            <p className="text-purple-100 text-sm">Chia sẻ hình ảnh, video và cảm xúc</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Trải nghiệm mới</h3>
                            <p className="text-purple-100 text sm">Khám phá tính năng và dịch vụ độc đáo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
