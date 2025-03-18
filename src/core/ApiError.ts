export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true,
    public stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public static badRequest(msg: string): ApiError {
    return new ApiError(400, msg);
  }

  public static unauthorized(msg: string): ApiError {
    return new ApiError(401, msg);
  }

  public static forbidden(msg: string): ApiError {
    return new ApiError(403, msg);
  }

  public static notFound(msg: string): ApiError {
    return new ApiError(404, msg);
  }

  public static internal(msg: string): ApiError {
    return new ApiError(500, msg);
  }
}
