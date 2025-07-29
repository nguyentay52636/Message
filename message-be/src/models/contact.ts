import { Schema, model, Document, Types } from 'mongoose';

interface IContact extends Document {
  user: Types.ObjectId;
  contact: Types.ObjectId;
  nickname?: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contact: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    nickname: {
      type: String,
      trim: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactSchema.index({ user: 1, contact: 1 }, { unique: true });
contactSchema.index({ user: 1, isFavorite: -1 });

export default model<IContact>('Contact', contactSchema); 