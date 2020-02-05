import { Document, Model, model, Schema } from "mongoose";
import { UserRole } from '@shared/types';

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param name:string
 */
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  created: Date;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: UserRole.Client,
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export const User: Model<IUser> = model("User", userSchema);
