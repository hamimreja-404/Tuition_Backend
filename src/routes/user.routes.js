import { Router } from "express";

import { loginAdmin, registerAdmin } from "../controller/admin.controller.js";
import { upload, uploadFile, getFiles } from "../controller/PDF.controller.js";
const router = Router();

router.route("/registerAdmin").post(registerAdmin);
router.route("/loginAdmin").post(loginAdmin)


router.route("/upload_files").post(upload.single("file"), uploadFile);
router.get("/get_files", getFiles);

export default router;
