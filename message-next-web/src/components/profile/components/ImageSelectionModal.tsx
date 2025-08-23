"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Check, Grid3X3, Camera, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ImageSelectorModalProps {
    type: "cover" | "avatar"
    onClose: () => void
    onSelect: (images: string[]) => void
}

// Mock gallery images
const galleryImages = [
    "/placeholder.svg?height=200&width=300&text=Gallery+1",
    "/placeholder.svg?height=200&width=300&text=Gallery+2",
    "/placeholder.svg?height=200&width=300&text=Gallery+3",
    "/placeholder.svg?height=200&width=300&text=Gallery+4",
    "/placeholder.svg?height=200&width=300&text=Gallery+5",
    "/placeholder.svg?height=200&width=300&text=Gallery+6",
    "/placeholder.svg?height=200&width=300&text=Gallery+7",
    "/placeholder.svg?height=200&width=300&text=Gallery+8",
    "/placeholder.svg?height=200&width=300&text=Gallery+9",
]

export function
    ImageSelectionModal({ type, onClose, onSelect }: ImageSelectorModalProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setUploadedImage(result)
                setSelectedImage(result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSelect = () => {
        if (selectedImage) {
            onSelect([selectedImage])
        }
    }

    const title = type === "cover" ? "Chọn ảnh bìa" : "Chọn ảnh đại diện"
    const aspectRatio = type === "cover" ? "aspect-[3/1]" : "aspect-square"

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="glass-effect border-white/20 max-w-4xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Camera className="mr-2 h-5 w-5" />
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="gallery" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 glass-effect">
                        <TabsTrigger value="gallery" className="flex items-center">
                            <Grid3X3 className="mr-2 h-4 w-4" />
                            Thư viện ảnh
                        </TabsTrigger>
                        <TabsTrigger value="upload" className="flex items-center">
                            <Upload className="mr-2 h-4 w-4" />
                            Tải ảnh lên
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="gallery" className="mt-6">
                        <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                            {galleryImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`${aspectRatio} rounded-xl overflow-hidden cursor-pointer relative group border-2 transition-all duration-300 ${selectedImage === image
                                        ? "border-primary ring-2 ring-primary/20"
                                        : "border-transparent hover:border-white/30"
                                        }`}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {selectedImage === image && (
                                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                            <div className="bg-primary rounded-full p-2">
                                                <Check className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="upload" className="mt-6">
                        <div className="space-y-6">
                            <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-primary/50 transition-colors duration-300">
                                <div className="space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center">
                                        <Upload className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Tải ảnh lên</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Kéo thả ảnh vào đây hoặc click để chọn file</p>
                                    </div>
                                    <div>
                                        <Label htmlFor="file-upload" className="cursor-pointer">
                                            <Input
                                                id="file-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                            <Button variant="outline" className="border-white/20 hover:bg-white/10">
                                                <ImageIcon className="mr-2 h-4 w-4" />
                                                Chọn ảnh
                                            </Button>
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            {uploadedImage && (
                                <div className="space-y-4">
                                    <h4 className="font-medium">Ảnh đã tải lên:</h4>
                                    <div
                                        className={`${aspectRatio} rounded-xl overflow-hidden border-2 border-primary ring-2 ring-primary/20`}
                                    >
                                        <img
                                            src={uploadedImage || "/placeholder.svg"}
                                            alt="Uploaded"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-white/10">
                    <Button variant="outline" onClick={onClose} className="border-white/20">
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSelect}
                        disabled={!selectedImage}
                        className="bg-gradient-to-r from-primary to-pink-500 hover:from-primary/80 hover:to-pink-500/80"
                    >
                        <Check className="mr-2 h-4 w-4" />
                        Chọn ảnh này
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
