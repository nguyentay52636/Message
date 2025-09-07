import React from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { acceptFriendRequest, refuseFriendRequest } from '@/apis/friendsApi'
interface ButtonAccessFriendsProps {
  requestId: string

}
export default function ButtonAccessFriends({ requestId }: ButtonAccessFriendsProps) {
  const handleAcceptRequest = async (requestId: string) => {
    try {
      await acceptFriendRequest(requestId);
      toast.success("Đã chấp nhận lời mời kết bạn");
      // onAcceptRequest?.();
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi chấp nhận lời mời");
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await refuseFriendRequest(requestId);
      toast.success("Đã từ chối lời mời kết bạn");
      // onRejectRequest?.();
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi từ chối lời mời");
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="default"
        onClick={() => requestId && handleAcceptRequest(requestId)}
        className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-700 text-white cursor-pointer"
        disabled={!requestId}
      >
        <Check className="w-4 h-4 mr-2" />
        Chấp nhận
      </Button>
      <Button

        onClick={() => requestId && handleRejectRequest(requestId)}
        variant="outline"
        className="px-4 py-2 rounded-xl bg-transparent cursor-pointer"
        disabled={!requestId}
      >
        <X className="w-4 h-4 mr-2" />
        Từ chối
      </Button>
    </div>
  )
}
