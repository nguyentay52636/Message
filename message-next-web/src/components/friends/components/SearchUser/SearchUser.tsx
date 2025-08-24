import { Search, ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FindUserByPhone } from "@/apis/friendsRequestApi";
import ResponeUser from "../Respone/ResponeUser";
import { IUser } from "@/types/types";

interface SearchUserProps {
  onBack: () => void;
}

export default function SearchUser({ onBack }: SearchUserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  // gọi API realtime khi gõ
  useEffect(() => {
    if (!searchQuery) {
      setUser(null);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await FindUserByPhone(searchQuery);
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
    }, 400); // debounce 400ms

    return () => clearTimeout(delay);
  }, [searchQuery]);

  return (
    <div className="p-4 border-b border-border">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 rounded-xl hover:bg-accent"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">Tìm bạn</h1>
      </div>

      {/* Ô search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Nhập số điện thoại..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-10 rounded-xl bg-muted/50"
        />
      </div>

      {/* Kết quả */}
      <ResponeUser user={user} loading={loading} searchQuery={searchQuery} />
    </div>
  );
}
