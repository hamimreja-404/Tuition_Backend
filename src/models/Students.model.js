// In your Students.model.js file

import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    className: {
        type: String,
        required: true,
    },
    examDate: {
        type: Date,
        required: true,
    },
    examName: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    }
});

// --- CORRECTED SCHEMA ---
const rollCounterSchema = new Schema({

    _id: {
        type: String,
        required: true,
    },

    sequence_value: {
        type: Number,
        default: 0,
    }
});

const Student = mongoose.model("Student", studentSchema);
const RollCounter = mongoose.model("RollCounter", rollCounterSchema);

export { Student, RollCounter };