import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function Group() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold">Danh sách nhóm và cộng đồng</h1>
            </div>

            {/* Stats */}
            <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-lg font-semibold">Nhóm và cộng đồng (15)</p>
            </div>

            {/* Coming Soon */}
            <Card className="text-center p-12">
                <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Sắp ra mắt</h3>
                <p className="text-muted-foreground">Tính năng nhóm và cộng đồng đang được phát triển</p>
            </Card>

        </div>

    )
}