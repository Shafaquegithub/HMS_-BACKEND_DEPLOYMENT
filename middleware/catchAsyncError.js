export const catchAsyncError = (fn) => {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};
// export const catchAsyncError = (theFunction) => {
//   return (req, res, next) => {
//     Promise.resolve(theFunction(req, res, next)).catch(next);
//   };
// };
