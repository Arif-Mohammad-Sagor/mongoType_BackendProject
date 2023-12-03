import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middleweres/validateRequest";
import { studentValidations } from "../student/student.validator";
const router =Router();
router
.post('/create-student',
validateRequest(studentValidations.createStudentValidationSchema),userControllers.createStudent);
export const userRouter=router;