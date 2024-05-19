import createError from "../utils/error.js";

const notFound = (req, res, next) => {
  next( createError(404,`No Route Match ${req.originalUrl}`));
};
export default notFound;
