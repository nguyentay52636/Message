import { Schema, model, Document, Types, models } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  coverPhoto?: string;
  bio?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen: Date;
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  verificationCode?: string;
  verificationCodeExpires?: Date;
  resetPasswordCode?: string;
  resetPasswordExpires?: Date;
  devices?: Types.ObjectId[];
  friends: Types.ObjectId[];
  blockedUsers: Types.ObjectId[];
  privacy: {
    showLastSeen: boolean;
    showOnlineStatus: boolean;
    allowFriendRequests: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    coverPhoto: { type: String, default: '' },
    bio: { type: String, default: '' },
    status: {
      type: String,
      enum: ['online', 'offline', 'away', 'busy'],
      default: 'offline',
    },
    lastSeen: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    verificationCode: { type: String, default: null },
    verificationCodeExpires: { type: Date, default: null },
    resetPasswordCode: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    devices: [
      {
        deviceId: { type: String, required: true },
        deviceName: { type: String, required: true },
        lastLogin: { type: Date, default: Date.now },
        ipAddress: { type: String, default: '' },
      },
    ],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    privacy: {
      showLastSeen: { type: Boolean, default: true },
      showOnlineStatus: { type: Boolean, default: true },
      allowFriendRequests: { type: Boolean, default: true },
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
