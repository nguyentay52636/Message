import { Schema, model, Document, Types } from 'mongoose';

interface IBlockedUser extends Document {
  user: Types.ObjectId;
  blockedUser: Types.ObjectId;
  reason?: string;
  createdAt: Date;
}

const blockedUserSchema = new Schema<IBlockedUser>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blockedUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reason: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

blockedUserSchema.index({ user: 1, blockedUser: 1 }, { unique: true });

export default model<IBlockedUser>('BlockedUser', blockedUserSchema);
