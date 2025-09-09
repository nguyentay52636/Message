import { Schema, model, Document, Types } from "mongoose";

interface IDevice extends Document {
  user: Types.ObjectId;
  deviceId: string;
  deviceName: string;
  lastLogin: Date;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const deviceSchema = new Schema<IDevice>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    deviceId: { type: String, required: true },
    deviceName: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    ipAddress: { type: String, default: "" },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "devices",
  }
);

const DeviceModel = model<IDevice>("Device", deviceSchema);

export default DeviceModel;
