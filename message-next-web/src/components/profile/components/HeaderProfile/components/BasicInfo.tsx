import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card'
import { Briefcase, Info, GraduationCap, Home, MapPin, Heart, Calendar, Mail, Globe, Edit } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

export default function BasicInfo({ profileData }: { profileData: any }) {

    const formatBirthday = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    }
    return (
        <>
            <Card className="glass-effect border-white/20">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Info className="mr-2 h-5 w-5" />
                        Giới thiệu
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {profileData.bio && <p className="text-sm leading-relaxed">{profileData.bio}</p>}

                    <div className="space-y-3">
                        {profileData.workplace && (
                            <div className="flex items-center space-x-3">
                                <Briefcase className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">Làm việc tại {profileData.workplace}</span>
                            </div>
                        )}

                        {profileData.education && profileData.education[0] && (
                            <div className="flex items-center space-x-3">
                                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">Học tại {profileData.education[0].school}</span>
                            </div>
                        )}

                        {profileData.hometown && (
                            <div className="flex items-center space-x-3">
                                <Home className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">Đến từ {profileData.hometown}</span>
                            </div>
                        )}

                        {profileData.location && (
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">Sống tại {profileData.location}</span>
                            </div>
                        )}

                        {profileData.relationship && (
                            <div className="flex items-center space-x-3">
                                <Heart className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">{profileData.relationship}</span>
                            </div>
                        )}

                        {profileData.birthday && (
                            <div className="flex items-center space-x-3">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">Sinh nhật: {formatBirthday(profileData.birthday)}</span>
                            </div>
                        )}

                        {profileData.email && (
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">{profileData.email}</span>
                            </div>
                        )}

                        {profileData.website && (
                            <div className="flex items-center space-x-3">
                                <Globe className="h-5 w-5 text-muted-foreground" />
                                <a
                                    href={profileData.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline"
                                >
                                    {profileData.website}
                                </a>
                            </div>
                        )}
                    </div>

                    <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa thông tin
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}
