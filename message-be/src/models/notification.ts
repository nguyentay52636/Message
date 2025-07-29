import { Schema, model, Document, Types } from 'mongoose';

interface INotification extends Document {
  recipient: Types.ObjectId;
  sender?: Types.ObjectId;
  type: 'message' | 'call' | 'friend_request' | 'group_invite' | 'system';
  title: string;
  content: string;
  isRead: boolean;
  relatedId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['message', 'call', 'friend_request', 'group_invite', 'system'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

export default model<INotification>('Notification', notificationSchema); 