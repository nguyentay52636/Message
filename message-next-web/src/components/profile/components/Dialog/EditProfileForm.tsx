import { Label } from "@/components/ui/label"

import { useState } from "react"

import { profileData } from "../../mock/data"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function EditProfileForm({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: profileData.name,
        bio: profileData.bio,
        location: profileData.location,
        workplace: profileData.workplace,
        relationship: profileData.relationship,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("Updating profile:", formData)
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass-effect border-white/20"
                    />
                </div>
                <div>
                    <Label htmlFor="location">Địa điểm</Label>
                    <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="glass-effect border-white/20"
                    />
                </div>
                <div>
                    <Label htmlFor="workplace">Nơi làm việc</Label>
                    <Input
                        id="workplace"
                        value={formData.workplace}
                        onChange={(e) => setFormData({ ...formData, workplace: e.target.value })}
                        className="glass-effect border-white/20"
                    />
                </div>

            </div>

            <div>
                <Label htmlFor="bio">Tiểu sử</Label>
                <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="min-h-[100px] glass-effect border-white/20"
                />
            </div>

            <div className="flex items-center justify-end space-x-3">
                <Button type="button" variant="outline" onClick={onClose} className="border-white/20">
                    Hủy
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-primary to-pink-500">
                    Lưu thay đổi
                </Button>
            </div>
        </form>
    )
}