import { Schema, Document, Types } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  tasks: Types.ObjectId[];
  
}

export const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
},{ collection: 'users' });
