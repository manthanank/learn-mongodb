import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from '../types.js';

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
  fullName: string;
}

const addressSchema = new Schema(
  {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true }
  },
  { _id: false }
);

export const userSchema = new Schema<IUserDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address format']
    },
    age: { type: Number, min: [0, 'Age cannot be negative'], max: [120, 'Age cannot exceed 120'] },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    department: { type: String, default: 'General' },
    salary: { type: Number, min: 0 },
    tags: [{ type: String, trim: true }],
    address: addressSchema,
    phoneNumber: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    registrationDate: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual property: fullName
userSchema.virtual('fullName').get(function (this: IUserDocument) {
  return `${this.firstName} ${this.lastName}`.trim();
});

// Compound Index following ESR rule (department Equality, registrationDate Range)
userSchema.index({ department: 1, registrationDate: -1 });
userSchema.index({ tags: 1 });

// Pre-save hook: ensure email is lowercase
userSchema.pre('save', function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

export const UserModel: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>('User', userSchema);
