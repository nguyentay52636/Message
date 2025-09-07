import { Document, Types } from 'mongoose';
interface IContact extends Document {
    user: Types.ObjectId;
    contact: Types.ObjectId;
    nickname?: string;
    isFavorite: boolean;
    status: 'accepted' | 'pending' | 'blocked';
    friendSince: Date;
}
declare const _default: import("mongoose").Model<IContact, {}, {}, {}, Document<unknown, {}, IContact, {}> & IContact & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=contact.d.ts.map