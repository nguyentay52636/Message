import { Schema, model, Document, Types } from 'mongoose';

interface IConversation extends Document {
  type: 'personal' | 'group';
  members: Types.ObjectId[];
  groupName?: string;
  groupAvatar?: string;
  groupAdmin?: Types.ObjectId;
  lastMessage?: Types.ObjectId;
  lastUpdated: Date;
createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    type: {
      type: String,
      enum: ['personal', 'group'],
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    groupName: { type: String },
    groupAvatar: { type: String },
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

conversationSchema.index({ members: 1, lastUpdated: -1 });

export default model<IConversation>('Conversation', conversationSchema); 