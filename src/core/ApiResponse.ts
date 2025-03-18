export class ApiResponse {
  constructor(
    protected success: boolean,
    protected data: any,
    protected message: string
  ) {}

  public static success(data: any, message: string = "Success") {
    return {
      success: true,
      data,
      message,
    };
  }

  public static error(message: string, data: any = null) {
    return {
      success: false,
      data,
      message,
    };
  }
}
