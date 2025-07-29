import { Schema, model, Document } from 'mongoose';

interface IRole extends Document {
  name: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    permissions: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

roleSchema.index({ name: 1 });

export default model<IRole>('Role', roleSchema); 