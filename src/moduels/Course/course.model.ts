import { Schema, model } from "mongoose";
import { TCourse, TpreRequisiteCourese } from "./course.interface";


export const preRequisiteSchema = new Schema<TpreRequisiteCourese>({
  course:{
    type:Schema.Types.ObjectId,
    ref:'course'  
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
})

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
    trim: true,
  },
  preRequisiteCourses:[preRequisiteSchema],
  isDeleted:{
    type:Boolean,
    default:false
  }
});

courseSchema.pre('find',  function(next){
   this.find({isDeleted:{$ne:true}}) 
   next();
})

export const Course = model<TCourse>('course',courseSchema);