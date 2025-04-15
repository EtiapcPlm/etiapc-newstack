import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  image?: string;
  emailVerified?: Date;
  role: 'ADMIN' | 'COORDINATOR' | 'TEACHER';
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  authProvider?: 'credentials' | 'google';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    image: String,
    emailVerified: Date,
    role: {
      type: String,
      enum: ['ADMIN', 'COORDINATOR', 'TEACHER'],
      default: 'TEACHER',
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    authProvider: {
      type: String,
      enum: ['credentials', 'google'],
      default: 'credentials'
    }
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', userSchema);

export default User;