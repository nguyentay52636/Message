import { Schema, model, Document } from 'mongoose';

interface IImage extends Document {
  userId: string;
  base64: string;
  mimeType: string;
  createdAt: Date;
}

const imageSchema = new Schema<IImage>(
  {
    userId: {
      type: String,
      required: true,
    },
    base64: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

imageSchema.index({ userId: 1, createdAt: -1 });

export default model<IImage>('Image', imageSchema);