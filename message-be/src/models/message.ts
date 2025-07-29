import { Schema, model, Document, Types } from 'mongoose';

interface IMessage extends Document {
  sender: Types.ObjectId;
  conversation: Types.ObjectId;
  content: string;
  messageType: 'text' | 'image' | 'file' | 'audio' | 'video';
  mediaUrl?: string;
  isRead: boolean;
  readBy: Types.ObjectId[];
  replyTo?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ['text', 'image', 'file', 'audio', 'video'],
      default: 'text',
    },
    mediaUrl: {
      type: String,
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });

export default model<IMessage>('Message', messageSchema); 