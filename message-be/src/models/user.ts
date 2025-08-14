import { Schema, model, Document, Types, models } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'away'],
      default: 'online',
    },
    lastSeen: {
      type: Date,
      default: Date.now,
      
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users',
  }
);

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { unique: true });

const UserModel = models.User || model<IUser>('User', userSchema);

export default UserModel;
