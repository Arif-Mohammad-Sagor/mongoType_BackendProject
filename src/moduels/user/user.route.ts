import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middleweres/validateRequest";
import { studentValidations } from "../student/student.validator";
import { facultyValidations } from "../faculty/faculty.validation";
const router =Router();
router
.post('/create-student',
validateRequest(studentValidations.createStudentValidationSchema),
userControllers.createStudent);
router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userControllers.createFaculty,
);

export const userRouter=router;