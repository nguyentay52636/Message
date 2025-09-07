import mongoose, { Document } from 'mongoose';
export interface IMedia extends Document {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    uploadedBy: mongoose.Types.ObjectId;
    messageId?: mongoose.Types.ObjectId;
    conversationId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IMedia, {}, {}, {}, mongoose.Document<unknown, {}, IMedia, {}> & IMedia & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=media.d.ts.map