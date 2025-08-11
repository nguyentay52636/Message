import { Schema, model, Document, Types } from "mongoose";

interface IFriendRequest extends Document {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const friendRequestSchema = new Schema<IFriendRequest>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true, versionKey: false }
);

friendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

export default model<IFriendRequest>("FriendRequest", friendRequestSchema);
