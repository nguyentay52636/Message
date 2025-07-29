import mongoose, { Schema, Document } from 'mongoose';

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

const mediaSchema = new Schema<IMedia>({
  filename: {
    type: String,
    required: true,
    trim: true
  },
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messageId: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation'
  }
}, {
  timestamps: true
});

// Index for better query performance
mediaSchema.index({ uploadedBy: 1, createdAt: -1 });
mediaSchema.index({ messageId: 1 });
mediaSchema.index({ conversationId: 1 });

export default mongoose.model<IMedia>('Media', mediaSchema); 