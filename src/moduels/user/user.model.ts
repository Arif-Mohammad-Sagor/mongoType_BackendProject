/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import { TUser,UserModel } from './user.interfece';
import bcrypt from 'bcrypt'; 

const UserSchema = new Schema<TUser,UserModel>(
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
});

UserSchema.statics.isUserExistsByCustomId=async function(userId:string){
  return await userModel.findOne({userId}).select('+password')
}
UserSchema.statics.isPasswordMatch = async function(plainPassword:string,hashedPassword:string){
  console.log('from userModel',plainPassword);
return await bcrypt.compare(plainPassword,hashedPassword);
}
export const userModel = model<TUser,UserModel>('User', UserSchema);
