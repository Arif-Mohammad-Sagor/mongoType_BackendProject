import express from "express";
import { StudentControllers } from "./controller.student";


const router = express.Router();

router.get('/get-all-student',StudentControllers.getAllStudents);

export const studentRouter = {
    router

}