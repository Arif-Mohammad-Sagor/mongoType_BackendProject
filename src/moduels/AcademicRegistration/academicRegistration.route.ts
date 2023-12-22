import { Router } from "express";

import { SemesterRegistrationContollers } from "./academicRegistration.controller";
import validateRequest from "../../middleweres/validateRequest";
import { academicRegistrationValidationSchema, updateAcademicRegistrationValidationSchema } from "./academicRegistration.validation";




const router = Router();

router.post(
  '/createSemesterRegistration',
  validateRequest(academicRegistrationValidationSchema),
  SemesterRegistrationContollers.createSemesterRegistration,
);
router.get('/semesterRegistration',SemesterRegistrationContollers.getAllSemesterRegistration);
router.get('/semesterRegistration/:id',SemesterRegistrationContollers.singleSemesterRegistration)
router.patch(
  '/semesterRegistration/:id',
  validateRequest(updateAcademicRegistrationValidationSchema),
  SemesterRegistrationContollers.updateSemesterRegistration,
);

export const academicSemesterRegistrationRoute= router