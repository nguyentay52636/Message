import React, { useEffect, useState } from 'react'
import FriendItem from './FriendItem'
import { getAllFriendByUserId } from '@/apis/friendsApi';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/slices/authSlice';
import { IFriendDisplay } from '@/types/types';
import Loading from '@/components/loading/Loading';
export default function ListFriendsComponent() {
    const [friends, setFriends] = useState<IFriendDisplay[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector(selectAuth);
    const userId = user?.id;

    useEffect(() => {
        const fetchFriends = async () => {
            if (!userId) return;

            setIsLoading(true);
            try {
                const friendsData = await getAllFriendByUserId(userId);
                console.log('Friends data:', friendsData);
                setFriends(friendsData);
            } catch (error) {
                console.error('Error fetching friends:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchFriends();
    }, [userId]);
    // Group friends by first letter of name
    const groupFriendsByLetter = (friends: IFriendDisplay[]) => {
        const grouped: Record<string, IFriendDisplay[]> = {};
        friends.forEach(friend => {
            const firstLetter = friend.name.charAt(0).toUpperCase();
            if (!grouped[firstLetter]) {
                grouped[firstLetter] = [];
            }
            grouped[firstLetter].push(friend);
        });
        return grouped;
    };

    const groupedFriendsData = groupFriendsByLetter(friends);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-lg font-semibold">Bạn bè ({friends.length})</p>
            </div>

            {Object.entries(groupedFriendsData)
                .sort(([a], [b]) => a.localeCompare(b, "vi"))
                .map(([letter, friendsList]) => (
                    <div key={letter} className="space-y-3">
                        <h3 className="text-lg font-bold text-muted-foreground">{letter}</h3>
                        <div className="space-y-6">
                            {friendsList.map((friend) => (
                                <FriendItem key={friend._id} friend={friend} />
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}
