import { Document } from 'mongoose';
interface IRole extends Document {
    name: string;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: import("mongoose").Model<IRole, {}, {}, {}, Document<unknown, {}, IRole, {}> & IRole & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=role.d.ts.map