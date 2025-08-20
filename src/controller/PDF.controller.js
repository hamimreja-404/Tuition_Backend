import multer from "multer";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import PDFUrl from "../models/PDF.model.js";

// ---------------- Multer Configuration ---------------- //
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp"); // Save files in ./temp folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ---------------- Controllers ---------------- //

// Upload File
const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }
  console.log("THIS IS req.file",req.file)
  const { title } = req.body;
  if (!title || title.trim() === "") {
    throw new ApiError(400, "Title is required");
  }

  // Construct accessible file URL
  const fileURL = `/files/${req.file.filename}`;

  const newPdf = await PDFUrl.create({ title, fileURL });

  if (!newPdf) {
    throw new ApiError(500, "File upload failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newPdf, "File uploaded successfully"));
});

// Get All Files
const getFiles = asyncHandler(async (req, res) => {
  const files = await PDFUrl.find({}).sort({ createdAt: -1 }); // latest first

  return res
    .status(200)
    .json(new ApiResponse(200, files, "Files fetched successfully"));
});

// ---------------- Exports ---------------- //
export { upload, uploadFile, getFiles };
