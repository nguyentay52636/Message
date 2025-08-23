import { Star } from 'lucide-react'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function ImageSelectorModal({ profileData }: { profileData: any }) {
    return (
        <>
            <Card className="glass-effect border-white/20">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Star className="mr-2 h-5 w-5" />
                        Kỹ năng
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {(profileData.skills ?? []).map((skill: any) => (
                        <div key={skill.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{skill.name}</span>
                                <span className="text-xs text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-primary to-pink-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}
