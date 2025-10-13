import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import PostCard from '@/components/post/components/CardPost/PostCard'
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import { TabsContent } from '@radix-ui/react-tabs'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { formatBirthday, formatDate } from '@/lib/utils'
import { Calendar, Clock, Star, Award, Briefcase, GraduationCap, Grid3X3, Plus, Check } from 'lucide-react'

export default function TabsMainContentBody({ profileData, userPhotos, setShowImageSelector }: { profileData: any, userPhotos: any, setShowImageSelector: any }) {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const toggleImageSelection = (url: string) => {
        setSelectedImages((prev) =>
            prev.includes(url)
                ? prev.filter((img) => img !== url)
                : [...prev, url]
        );
    };

    return (
        <>
            {/* <TabsContent value="posts" className="space-y-6 animate-fade-in">
                {userPosts.length > 0 ? (
                    userPosts.map((post: any) => <PostCard key={post.id} post={post} user={profileData} />)
                ) : (
                    <Card className="glass-effect border-white/20 p-8 text-center">
                        <p className="text-muted-foreground">Chưa có bài viết nào</p>
                        <Button className="mt-4 bg-gradient-to-r from-primary to-pink-500">Tạo bài viết đầu tiên</Button>
                    </Card>
                )}
            </TabsContent> */}

            <TabsContent value="about" className="animate-fade-in">
                <div className="space-y-6">
                    {/* Personal Information */}
                    <Card className="glass-effect border-white/20">
                        <CardHeader>
                            <CardTitle>Thông tin cá nhân</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Họ và tên</Label>
                                    <p className="text-base">{profileData.name}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Giới tính</Label>
                                    <p className="text-base">{profileData.gender}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Ngày sinh</Label>
                                    <p className="text-base">{formatBirthday(profileData.birthday)}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Tình trạng</Label>
                                    <p className="text-base">{profileData.relationship}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Quê quán</Label>
                                    <p className="text-base">{profileData.hometown}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Nơi ở hiện tại</Label>
                                    <p className="text-base">{profileData.location}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Languages & Interests */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="glass-effect border-white/20">
                            <CardHeader>
                                <CardTitle>Ngôn ngữ</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {profileData.languages.map((language: any) => (
                                        <Badge key={language} variant="secondary" className="bg-primary/20 text-primary">
                                            {language}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glass-effect border-white/20">
                            <CardHeader>
                                <CardTitle>Sở thích</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {profileData.interests.map((interest: any) => (
                                        <Badge key={interest} variant="outline" className="border-primary/30 text-primary">
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="photos" className="animate-fade-in">
                <Card className="glass-effect border-white/20">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Ảnh của tôi</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="border-white/20">
                                <Grid3X3 className="mr-2 h-4 w-4" />
                                Tất cả ảnh
                            </Button>
                            <Button variant="outline" size="sm" className="border-white/20">
                                <Plus className="mr-2 h-4 w-4" />
                                Thêm ảnh
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {userPhotos.map((photo: any) => (
                                <div key={photo.id} className="space-y-2 group">
                                    <div className="aspect-square rounded-xl overflow-hidden relative">
                                        <img
                                            src={photo.url || "/placeholder.svg"}
                                            alt={photo.caption}
                                            className="w-full aspect-square rounded-xl cursor-pointer"
                                            onClick={() => toggleImageSelection(photo.url)}
                                        />
                                        {selectedImages.includes(photo.url) && (
                                            <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                                                <Check className="h-8 w-8 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium truncate">{photo.caption}</p>
                                        <p className="text-xs text-muted-foreground">{formatDate(photo.date)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="experience" className="animate-fade-in">
                <div className="space-y-6">
                    {/* Work Experience */}
                    <Card className="glass-effect border-white/20">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Briefcase className="mr-2 h-5 w-5" />
                                Kinh nghiệm làm việc
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {profileData.workExperience.map((work: any, index: any) => (
                                <div key={index} className="flex space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 bg-gradient-to-br from-primary to-pink-500 rounded-xl flex items-center justify-center">
                                            <Briefcase className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{work.position}</h3>
                                        <p className="text-primary font-medium">{work.company}</p>
                                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {work.period}
                                        </p>
                                        <p className="text-sm mt-2 leading-relaxed">{work.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Education */}
                    <Card className="glass-effect border-white/20">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <GraduationCap className="mr-2 h-5 w-5" />
                                Học vấn
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {profileData.education.map((edu: any, index: any) => (
                                <div key={index} className="flex space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                            <GraduationCap className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                                        <p className="text-primary font-medium">{edu.school}</p>
                                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {edu.year}
                                        </p>
                                        <p className="text-sm mt-2 leading-relaxed">{edu.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="achievements" className="animate-fade-in">
                <Card className="glass-effect border-white/20">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Award className="mr-2 h-5 w-5" />
                            Thành tích & Giải thưởng
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {profileData.achievements.map((achievement: any, index: any) => (
                            <div key={index} className="flex space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="h-12 w-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                                        <Award className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{achievement.title}</h3>
                                    <p className="text-primary font-medium">{achievement.organization}</p>
                                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {formatDate(achievement.date)}
                                    </p>
                                    <p className="text-sm mt-2 leading-relaxed">{achievement.description}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
        </>
    )
}
