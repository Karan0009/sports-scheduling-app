export default class ApiResponse {
  data: any;
  success: boolean;
  statusCode: number;
  message: string;
  error: any;

  constructor(
    data: any,
    success: boolean,
    statusCode: number,
    message: string,
    error: any,
  ) {
    this.data = data;
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
