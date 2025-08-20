// errorHandler.js
import ApiError from "./ApiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });
  }

  // For unexpected errors
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: [],
    data: null,
  });
};

export default errorHandler;
