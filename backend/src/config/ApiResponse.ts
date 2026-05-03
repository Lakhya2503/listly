
export class ApiResponse  {
  statusCode: number
  error: never[] | undefined
  message : string | undefined
  data : any;
  constructor(
      statusCode: any,
      data: any,
      message: string | undefined
  ) {
      this.statusCode = statusCode
      this.data = data
      this.message = message
  }
}
