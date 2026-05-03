
export class ApiError extends Error {
  statusCode: number
  error: never[] | undefined
  constructor(
      statusCode: any,
      message: string | undefined = "False",
      error = []
  ) {
      super(message)

      this.statusCode = statusCode
      this.message = message


      if(error) {
        this.error = error
      }

  }
}
