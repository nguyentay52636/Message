import React from 'react'
import { ImageIcon, FileText, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockLinks } from './mockProfile'
import CollapsibleSection from './CollapsibleSection'

interface MediaSectionProps {
    expandedSections: Record<string, boolean>
    toggleSection: (section: string) => void
}

export default function MediaSection({ expandedSections, toggleSection }: MediaSectionProps) {
    return (
        <div className="space-y-0">
            {/* Photos/Videos Section */}
            <CollapsibleSection
                title="Ảnh/Video"
                icon={<ImageIcon className="w-5 h-5 text-muted-foreground" />}
                isExpanded={expandedSections.photos}
                onToggle={() => toggleSection("photos")}
            >
                <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">Chưa có Ảnh/Video được chia sẻ trong hội thoại này</p>
                </div>
            </CollapsibleSection>

            {/* Files Section */}
            <CollapsibleSection
                title="File"
                icon={<FileText className="w-5 h-5 text-muted-foreground" />}
                isExpanded={expandedSections.files}
                onToggle={() => toggleSection("files")}
            >
                <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">Chưa có File được chia sẻ trong hội thoại này</p>
                </div>
            </CollapsibleSection>

            {/* Links Section */}
            <CollapsibleSection
                title="Link"
                icon={<Link className="w-5 h-5 text-muted-foreground" />}
                isExpanded={expandedSections.links}
                onToggle={() => toggleSection("links")}
            >
                <div className="space-y-3">
                    {mockLinks.map((link) => (
                        <div key={link.id} className="mb-3">
                            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <img
                                        src="/placeholder.svg?height=32&width=32&text=GH"
                                        alt="GitHub"
                                        className="w-6 h-6 rounded"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">{link.title}</h4>
                                        <span className="text-xs text-gray-500 ml-2">{link.timestamp}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-1">{link.domain}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="text-center">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-white"
                        >
                            Xem tất cả
                        </Button>
                    </div>
                </div>
            </CollapsibleSection>
        </div>
    )
}
