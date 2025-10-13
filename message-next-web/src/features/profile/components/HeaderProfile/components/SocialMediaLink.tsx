import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function SocialMediaLink({ profileData }: { profileData: any }) {
    return (
        <>
            <Card className="glass-effect border-white/20">
                <CardHeader>
                    <CardTitle>Liên kết xã hội</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {profileData.socialLinks.map((link: any) => (
                        <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                        >
                            <span className="text-lg">{link.icon}</span>
                            <span className="text-sm font-medium">{link.platform}</span>
                        </a>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}
