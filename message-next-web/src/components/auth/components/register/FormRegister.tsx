"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react'
import { useRegisterForm } from './hooks/useRegisterForm'
import ProgressSteps from './components/ProgressSteps'
import FormCompletion from './components/FormCompletion'
import PasswordStrength from './components/PasswordStrength'
import OTPSection from './components/OTPSection'
import TermsAgreement from './components/TermsAgreement'

interface FormRegisterProps {
    onSwitchToLogin: () => void
    onRegisterSuccess: () => void
}

export default function FormRegister({ onSwitchToLogin, onRegisterSuccess }: FormRegisterProps) {
    const { state, actions, helpers } = useRegisterForm()
    const {
        showPassword,
        showConfirmPassword,
        currentStep,
        isLoading,
        passwordStrength,
        otp,
        countdown,
        registrationData,
        watchedPassword,
        watchedAgreeTerms,
        watchedEmail,
        watchedUsername,
        watchedPhone,
        watchedConfirmPassword,
        errors,
    } = state

    const { setShowPassword, setShowConfirmPassword, setOtp, setValue, handleSubmit, handleFormSubmit, handleBackToStep1, handleResendOTP } = actions
    const { register, isFormValid, getPasswordStrengthText } = helpers

    return (
        <div className="bg-white w-full max-w-2xl mx-auto rounded-3xl shadow-xl p-10 border border-gray-100">
            {/* Progress Steps */}
            <ProgressSteps currentStep={currentStep} />

            {/* Form Completion Indicator */}
            {currentStep === 1 && (
                <FormCompletion
                    progress={(isFormValid() ? 1 : 0)}
                    debugInfo={process.env.NODE_ENV === 'development' ? (
                        <div className="mt-3 pt-3 border-t border-blue-200 text-xs text-blue-600">
                            <div>Email: {watchedEmail ? '✓' : '✗'}</div>
                            <div>Username: {watchedUsername && watchedUsername.length >= 2 ? '✓' : '✗'}</div>
                            <div>Phone: {watchedPhone && watchedPhone.length >= 10 ? '✓' : '✗'}</div>
                            <div>Password: {watchedPassword && watchedPassword.length >= 8 ? '✓' : '✗'}</div>
                            <div>Confirm: {watchedPassword === watchedConfirmPassword ? '✓' : '✗'}</div>
                            <div>Terms: {watchedAgreeTerms ? '✓' : '✗'}</div>
                        </div>
                    ) : undefined}
                />
            )}

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                {currentStep === 1 ? (
                    <>
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Email</label>
                            <Input
                                {...register("email")}
                                type="email"
                                placeholder="Nhập địa chỉ email"
                                className={`h-12 text-base border-gray-300 focus:border-blue-400 focus:ring-blue-400 rounded-xl ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Tên người dùng</label>
                            <Input
                                {...register("username")}
                                type="text"
                                placeholder="Nhập tên người dùng"
                                className={`h-12 text-base border-gray-300 focus:border-blue-400 focus:ring-blue-400 rounded-xl ${errors.username ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                    }`}
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500">{errors.username.message}</p>
                            )}
                            {watchedUsername && (
                                <div className="flex justify-between items-center">
                                    <span className={`text-xs ${watchedUsername.length < 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                                        {watchedUsername.length < 2 ? 'Cần ít nhất 2 ký tự' : '✓ Hợp lệ'}
                                    </span>
                                    <span className="text-xs text-gray-500">{watchedUsername.length}/2</span>
                                </div>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Số điện thoại</label>
                            <Input
                                {...register("phone")}
                                type="tel"
                                placeholder="Nhập số điện thoại (VD: 0123456789)"
                                className={`h-12 text-base border-gray-300 focus:border-blue-400 focus:ring-blue-400 rounded-xl ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                    }`}
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone.message}</p>
                            )}
                            {watchedPhone && watchedPhone.length < 10 && (
                                <p className="text-sm text-yellow-600">Số điện thoại phải có ít nhất 10 số</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-semibold text-gray-700">Mật khẩu</label>
                            <div className="relative">
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                                    className={`h-12 text-base border-gray-300 focus:border-blue-400 focus:ring-blue-400 pr-12 rounded-xl ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                        }`}
                                />
                                <Button
                                    variant='ghost'
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-500"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </Button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                            {watchedPassword && (
                                <PasswordStrength strength={passwordStrength} label={getPasswordStrengthText()} />
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Xác nhận mật khẩu</label>
                            <div className="relative">
                                <Input
                                    {...register("confirmPassword")}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Nhập lại mật khẩu"
                                    className={`h-12 text-base border-gray-300 focus:border-blue-400 focus:ring-blue-400 pr-12 rounded-xl ${errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                        }`}
                                />
                                <Button
                                    variant='ghost'
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-500"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </Button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Terms Agreement */}
                        <TermsAgreement
                            checked={!!watchedAgreeTerms}
                            onCheckedChange={(checked) => setValue("agreeTerms", checked as boolean)}
                        />
                        {errors.agreeTerms && (
                            <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>
                        )}
                    </>
                ) : (
                    <>
                        <OTPSection
                            email={registrationData?.email}
                            otp={otp}
                            setOtp={(val) => setOtp(val)}
                            countdown={countdown}
                            isLoading={isLoading}
                            onResend={handleResendOTP}
                        />
                    </>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading || (currentStep === 1 && !isFormValid()) || (currentStep === 2 && !otp)}
                    className="w-full h-12 bg-blue-400 hover:bg-blue-500 cursor-pointer text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            {currentStep === 1 ? "Tiếp tục" : "Hoàn tất đăng ký"}
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </Button>

                {currentStep === 2 && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleBackToStep1}
                        className="w-full h-12 border-blue-300 text-blue-400 hover:bg-blue-50 rounded-xl flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Quay lại
                    </Button>
                )}
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Đã có tài khoản?{" "}
                    <Button variant="link" onClick={onSwitchToLogin} className="text-blue-400 hover:text-blue-500 font-semibold">
                        Đăng nhập ngay
                    </Button>
                </p>
            </div>
        </div>
    )
}