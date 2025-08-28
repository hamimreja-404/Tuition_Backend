import { Router } from "express";

import { loginAdmin, registerAdmin } from "../controller/admin.controller.js";
import { upload, uploadFile, getFiles } from "../controller/PDF.controller.js";
import { incrementVisitorCount, getVisitorCount } from "../controller/visitor.controller.js";
import { getUpcomingExams, uploadUpcomingExam } from "../controller/upcoming.controller.js";
import { addStudent, getAllStudents, getStudentByRollNumber } from "../controller/students.controller.js";


const router = Router();

router.route("/registerAdmin").post(registerAdmin);
router.route("/loginAdmin").post(loginAdmin)


router.route("/upload_files").post(upload.single("file"), uploadFile);
router.get("/get_files", getFiles);

router.post("/visit", incrementVisitorCount);
router.get("/visitor-count", getVisitorCount);

router.post("/upload-Upcoming-Exam",uploadUpcomingExam);
router.get("/get-Upcoming-Exams",getUpcomingExams);

router.post("/addStudent",addStudent);
router.get("/getAllStudents",getAllStudents);
router.post("/getStudentByRollNumber",getStudentByRollNumber)
export default router;
