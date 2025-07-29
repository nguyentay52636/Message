import { Schema, model, Document, Types } from 'mongoose';

interface ITinNhan extends Document {
  noiDung?: string;
  nguoiGui: Types.ObjectId;
  cuocTroChuyen: Types.ObjectId;
  loaiTinNhan: 'text' | 'image' | 'video' | 'file' | 'system';
  media?: Types.ObjectId;
  trangThai: 'sent' | 'delivered' | 'read';
  thoiGianGui: Date;
  daXoa: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tinNhanSchema = new Schema<ITinNhan>(
  {
    noiDung: { type: String },
    nguoiGui: {
      type: Schema.Types.ObjectId,
      ref: 'nguoiDung',
      required: true,
    },
    cuocTroChuyen: {
      type: Schema.Types.ObjectId,
      ref: 'CuocTroChuyen',
      required: true,
    },
    loaiTinNhan: {
      type: String,
      enum: ['text', 'image', 'video', 'file', 'system'],
      default: 'text',
    },
    media: {
      type: Schema.Types.ObjectId,
      ref: 'Media',
    },
    trangThai: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
    },
    thoiGianGui: { type: Date, default: Date.now },
    daXoa: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

tinNhanSchema.index({ cuocTroChuyen: 1, thoiGianGui: -1 });

export default model<ITinNhan>('TinNhan', tinNhanSchema);