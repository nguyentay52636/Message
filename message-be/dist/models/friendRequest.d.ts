import { Document, Types } from "mongoose";
interface IFriendRequest extends Document {
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    status: "pending" | "accepted" | "rejected";
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: import("mongoose").Model<IFriendRequest, {}, {}, {}, Document<unknown, {}, IFriendRequest, {}> & IFriendRequest & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=friendRequest.d.ts.map