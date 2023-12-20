import { Router } from "express";

import { SemesterRegistrationContollers } from "./academicRegistration.controller";
import validateRequest from "../../middleweres/validateRequest";
import { academicRegistrationValidationSchema } from "./academicRegistration.validation";




const router = Router();

router.post(
  '/createSemesterRegistration',
  validateRequest(academicRegistrationValidationSchema),
  SemesterRegistrationContollers.createSemesterRegistration,
);

export const academicSemesterRegistrationRoute= router