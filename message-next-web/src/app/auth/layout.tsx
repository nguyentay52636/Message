"use client"

import { useState } from "react"
import { LoginForm } from "./login/page"
import { RegisterForm } from "./register/page"

interface AuthWrapperProps {
    onAuthSuccess: () => void
}

export function AuthWrapper({ onAuthSuccess }: AuthWrapperProps) {
    const [authMode, setAuthMode] = useState<"login" | "register">("login")

    return (
        <>
            {authMode === "login" ? (
                <LoginForm onSwitchToRegister={() => setAuthMode("register")} onLoginSuccess={onAuthSuccess} />
            ) : (
                <RegisterForm onSwitchToLogin={() => setAuthMode("login")} onRegisterSuccess={onAuthSuccess} />
            )}
        </>
    )
}

// Default export for Next.js layout
export default function AuthLayout() {
    const handleAuthSuccess = () => {
        // Handle successful authentication
        console.log("Authentication successful")
        // You can add navigation logic here
        // router.push('/chat')
    }

    return (
        <div className="min-h-screen">
            <AuthWrapper onAuthSuccess={handleAuthSuccess} />
        </div>
    )
} 