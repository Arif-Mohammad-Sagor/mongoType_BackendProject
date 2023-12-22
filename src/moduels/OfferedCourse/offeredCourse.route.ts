import { Router } from "express";
import validateRequest from "../../middleweres/validateRequest";
import { createOfferedCourseValidationSchema } from "./offeredCourse.validation";
import { createOfferedCourse } from "./offeredCourse.controllers";

const router = Router();

router.post('/offeredCourse',
validateRequest(createOfferedCourseValidationSchema),
createOfferedCourse
)

export const offeredCourseRoute= router;