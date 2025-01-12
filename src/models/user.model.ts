import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
  Admin = "admin",
  Doctor = "doctor",
  Patient = "patient",
}

export interface IUser extends Document {
  username: string;
  password: string;
  role: UserRole;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
