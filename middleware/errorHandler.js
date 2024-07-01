class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // if (err.code === 11000) {
  //   const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
  //   err = new ErrorHandler(message, 400);
  // }
  // if (err.name === "JsonWebTokenError") {
  //   const message = `Json Web Token is Invalid, Try Again`;
  //   err = new ErrorHandler(message, 400);
  // }
  // if (err.name === "TokenExpiredError") {
  //   const message = `Json Web Token is Expired, Try Again`;
  //   err = new ErrorHandler(message, 400);
  // }
  // if (err.name === "CastError") {
  //   const message = `Invalid ${err.path}`;
  //   err = new ErrorHandler(message, 400);
  // }
  // const errorMessage = err.errors
  //   ? Object.values(err.errors)
  //       .map((errValue) => errValue.message)
  //       .join(" ")
  //   : err.message;
  const errMessage = err.errors
    ? Object.values(err.errors)
        .map((val) => val.message)
        .join(" ")
    : err.message;
  return res.status(400).json({
    success: false,
    message: errMessage,
  });
};
export default ErrorHandler;
