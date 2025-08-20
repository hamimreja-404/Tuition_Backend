import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const adminSchema = new Schema({
    fullName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

// Password Encryption using bcrypt
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    else{
        this.password =  await bcrypt.hash(this.password, 10);
        next();
    }
})

// Checking if password is correct
adminSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
        Username: this.Username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
adminSchema.methods.generateRefreshToken = function () {
    return(
        jwt.sign(
            {
                _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY 
            }
        )
    )
}
export const Admin = mongoose.model("admin", adminSchema);