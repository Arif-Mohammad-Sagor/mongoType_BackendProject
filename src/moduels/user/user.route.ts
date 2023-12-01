import { Router } from "express";
import { userControllers } from "./user.controller";

const router =Router();


router.post('/create-student',userControllers.createStudent);

export const userRouter=router;