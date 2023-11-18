import express from "express";
import { Controllers } from "./controller.student";

const router = express.Router();

router.post('/create-student',Controllers.studentController);

export const studentRouter = {
    router
}