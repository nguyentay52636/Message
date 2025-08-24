import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { IUser } from "@/types/types";
import { FindUserByPhone } from "@/apis/friendsRequestApi";

interface SearchFilterFriendsProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    filterBy: string;
    setFilterBy: (filter: string) => void;
}

export default function SearchFilterFriends({
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
}: SearchFilterFriendsProps) {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const res = await FindUserByPhone(searchQuery);
            // backend trả về mảng -> lấy user đầu tiên
            if (res && res.length > 0) {
                setUser(res[0]);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!searchQuery) {
            setUser(null);
            return;
        }
        const delay = setTimeout(() => {
            handleSearch();
        }, 400); // debounce 400ms
        return () => clearTimeout(delay);
    }, [searchQuery]);

    return (
        <div className="flex flex-col gap-4">
            {/* Thanh search + filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm bạn"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 rounded-xl"
                    />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl">
                        <SelectValue placeholder="Sắp xếp" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name-asc">Tên (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Tên (Z-A)</SelectItem>
                        <SelectItem value="online-first">Online trước</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-full sm:w-32 h-12 rounded-xl">
                        <SelectValue placeholder="Lọc" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Hiển thị kết quả */}
            <div className="mt-4">
                {loading && (
                    <p className="text-sm text-muted-foreground">Đang tìm kiếm...</p>
                )}
                {!loading && searchQuery && !user && (
                    <p className="text-sm text-muted-foreground">Không tìm thấy người dùng</p>
                )}
                {user && (
                    <div className="flex items-center gap-3 p-3 border rounded-xl bg-white shadow-sm">
                        <img
                            src={user.avatar || "/default-avatar.png"}
                            alt={user.username}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                            <div className="font-medium">{user.username}</div>
                            <div className="text-sm text-gray-500">{user.phone}</div>
                        </div>
                        <span
                            className={`w-3 h-3 rounded-full ${user.status === "online" ? "bg-green-500" : "bg-gray-400"
                                }`}
                        ></span>
                    </div>
                )}
            </div>
        </div>
    );
}
