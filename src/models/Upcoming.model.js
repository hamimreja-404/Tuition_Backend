import {mongoose, Schema} from "mongoose";


const UpcomingSchema = new Schema({
    eligibility:{
        required: true,
        type: String
    },
    title :{
        required:true,
        type: String
    },
    fee:{
        required: true,
        type: Number
    },
    appStartDate :{
        required:true,
        type: String
    },
    examDate :{
        required:true,
        type: String
    },
    appEndDate :{
        required:true,
        type: String
    },
},{
    timestamps:true
}
)


const Upcoming = mongoose.model("upcoming", UpcomingSchema);
export default Upcoming;