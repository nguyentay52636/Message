import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageIcon } from 'lucide-react'
import React from 'react'

export default function RecentPhoto({ profileData, userPhotos }: { profileData: any, userPhotos: any }) {
    return (
        <>
            <Card className="glass-effect border-white/20">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center">
                        <ImageIcon className="mr-2 h-5 w-5" />
                        Ảnh gần đây
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/20">
                        Xem tất cả
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                        {userPhotos.slice(0, 9).map((photo: any) => (
                            <div key={photo.id} className="aspect-square rounded-xl overflow-hidden group cursor-pointer">
                                <img
                                    src={photo.url || "/placeholder.svg"}
                                    alt={photo.caption}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
