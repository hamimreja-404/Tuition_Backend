import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true
    },
    avatar:{
        type: String, //Cloudinary URL
        required: false
    }
},{
    timestamps: true
})



export const User = mongoose.model("user", userSchema);