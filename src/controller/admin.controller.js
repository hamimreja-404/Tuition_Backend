import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";

const generateAccessAndRefreshTokens = async (userID) => {
  try {
    const user = await Admin.findById(userID);
    console.log(userID)
    console.log(user)
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

// Register a new user
const registerAdmin = asyncHandler(async (req, res) => {
  const { fullName, email, password,secretPin } = req.body;
  console.log(req.body);
  if ([fullName, email,password,secretPin].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  if (secretPin !== process.env.secretPin) {
    throw new ApiError(403, "You are not authorized to register as an admin");
  }
  const existingUser = await Admin.findOne({email});
  if (existingUser) {
    throw new ApiError(400, "Admin already exists");
  }

  const tempUser = await Admin({
    fullName,
    email,
    password,
  });
  const refreshToken = tempUser.generateRefreshToken();

  // Add refreshToken to the user object
  tempUser.refreshToken = refreshToken;

  // Save user
  const user = await tempUser.save();

  const createdUser = await Admin.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Admin registration failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "Admin Created Successfully"));
});

//Login a user

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await Admin.findOne({email});
  if (!existingUser) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await existingUser.isCorrectPassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }
  console.log(existingUser._id.toString());
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    existingUser._id.toString()
  );

  const loggedInAdmin = await Admin.findById(existingUser._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInAdmin,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully"
      )
    );
});

export { registerAdmin, loginAdmin };
