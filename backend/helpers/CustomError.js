function CustomError(message, status = 200) {
  const error = new Error(message);
  error.code = status;
  return error;
}

CustomError.prototype = Object.create(Error.prototype);
export { CustomError };
