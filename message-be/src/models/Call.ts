import { Schema, model, Document, Types } from 'mongoose';

interface ICall extends Document {
  caller: Types.ObjectId;
  receiver: Types.ObjectId;
  conversation: Types.ObjectId;
  callType: 'voice' | 'video';
  status: 'incoming' | 'ongoing' | 'ended' | 'missed';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

const callSchema = new Schema<ICall>(
  {
    caller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    callType: {
      type: String,
      enum: ['voice', 'video'],
      required: true,
    },
    status: {
      type: String,
      enum: ['incoming', 'ongoing', 'ended', 'missed'],
      default: 'incoming',
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    duration: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

callSchema.index({ caller: 1, startTime: -1 });
callSchema.index({ receiver: 1, startTime: -1 });

export default model<ICall>('Call', callSchema); 