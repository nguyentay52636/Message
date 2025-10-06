import React from 'react'
import FeaturesLogin from './FeaturesLogin'
export default function LeftPanelLogin() {
    return (
        <>
            <div className="lg:flex lg:w-1/2  bg-[url('/zalo-bg.png')]! bg-cover bg-center bg-no-repeat">

                <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>



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

                    <FeaturesLogin />
                </div>
            </div>
        </>
    )
}
