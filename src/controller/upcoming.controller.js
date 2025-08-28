import Upcoming from "../models/Upcoming.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const uploadUpcomingExam = asyncHandler(async (req, res) => {
  const { title, eligibility, fee, appStartDate, appEndDate, examDate } = req.body;

  const upcomingExam = new Upcoming({
    title,
    eligibility,
    fee,
    appStartDate,
    appEndDate,
    examDate
  });
    const exam =  await upcomingExam.save();
    if (!exam) {
      return res.status(500).json({ message: "Failed to upload upcoming exam" });
    }
    
    return res.status(201).json(new ApiResponse(201, exam, "Upcoming Exam Uploaded Successfully"));
});

const getUpcomingExams = asyncHandler(async (req, res) => {
    const upcomingExams = await Upcoming.find({}).sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200,upcomingExams, "Upcoming Exams Fetched Successfully"));
})

export { uploadUpcomingExam, getUpcomingExams };