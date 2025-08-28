import { Student, RollCounter } from "../models/Students.model.js";
import asyncHandler from "../utils/asyncHandler.js";


const getNextRollNumber = async (sequenceName) => {
  const sequenceDocument = await RollCounter.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
};

// CONTROLLER: This is where asyncHandler is used correctly
const addStudent = asyncHandler(async (req, res) => {
  const { fullName, DOB, email, className, examDate, examName, isPaid } = req.body;

  // 1. Create the unique sequence name
  const dayOfExam = new Date(examDate).getDate().toString().padStart(2, '0');
  const sequenceName = `${examName.replace(/\s+/g, '')}${className}${dayOfExam}`;

  // 2. Call the helper function to get the next number
  const sequenceNumber = await getNextRollNumber(sequenceName);

  // 3. Format and create the final roll number
  const paddedSequence = sequenceNumber.toString().padStart(3, '0');
  const rollNumber = `${examName.replace(/\s+/g, '')}${className}${dayOfExam}${paddedSequence}`;

  // 4. Create the new student with the generated roll number
  const newStudent = await Student.create({
    fullName,
    DOB,
    email,
    className,
    examDate,
    examName,
    isPaid,
    rollNumber, // Add the generated roll number here
  });

  // 5. Send the response
  return res.status(201).json({
    success: true,
    message: "Student registered successfully!",
    data: newStudent,
  });
});

const getAllStudents = asyncHandler(async(req,res)=>{
    const students = await Student.find({});
    return res.status(200).json({
        success: true,
        message: "Students fetched successfully",
        data: students
    });
})

const getStudentByRollNumber = asyncHandler(async(req,res)=>{
    const {rollNumber, DOB} = req.body;
    const student = await Student.findOne({rollNumber});
    if(!student){
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }
    if(new Date(student.DOB).toISOString().split('T')[0] !== new Date(DOB).toISOString().split('T')[0]){
        return res.status(400).json({
            success: false,
            message: "DOB does not match"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Student fetched successfully",
        data: student
    });
})

export { addStudent, getAllStudents, getStudentByRollNumber };
