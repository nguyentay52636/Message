import { Plus } from 'lucide-react'
import { DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DialogHeader } from '@/components/ui/dialog'
import { DialogContent } from '@/components/ui/dialog'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Edit } from 'lucide-react'
import EditProfileForm from './EditProfileForm'

export default function DialogEditProfile() {
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    return (
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <EditProfileForm onClose={() => setIsEditingProfile(false)} />
        </div>
    )
}
