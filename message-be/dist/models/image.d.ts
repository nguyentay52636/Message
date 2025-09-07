import { Document } from 'mongoose';
interface IImage extends Document {
    userId: string;
    base64: string | null;
    fileUrl?: string;
    mimeType: string;
    createdAt: Date;
}
declare const _default: import("mongoose").Model<IImage, {}, {}, {}, Document<unknown, {}, IImage, {}> & IImage & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=image.d.ts.map