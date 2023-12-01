import { Schema, model } from 'mongoose';
import { IUser } from './user.interfece';
import bcrypt from 'bcrypt'; 

const UserSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsChangePassword: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  // const user = this;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
UserSchema.post('save',function(doc,next){
  doc.password='';
  next()
})
export const userModel = model<IUser>('users', UserSchema);
