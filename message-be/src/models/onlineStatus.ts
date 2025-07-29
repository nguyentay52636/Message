import mongoose, { Schema, Document } from 'mongoose';

export interface IOnlineStatus extends Document {
  userId: mongoose.Types.ObjectId;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen: Date;
  isOnline: boolean;
  socketId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const onlineStatusSchema = new Schema<IOnlineStatus>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'away', 'busy'],
    default: 'offline'
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  socketId: {
    type: String,
    sparse: true
  }
}, {
  timestamps: true
});

// Index for better query performance
onlineStatusSchema.index({ userId: 1 });
onlineStatusSchema.index({ isOnline: 1 });
onlineStatusSchema.index({ status: 1 });

export default mongoose.model<IOnlineStatus>('OnlineStatus', onlineStatusSchema); 