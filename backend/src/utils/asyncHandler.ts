

export  const asyncHandler = (requestHandler: (req: any, res: any) => any ) => {
    return (req: any, res: any, next: (arg: any) => any) => {
    Promise.resolve(requestHandler(req, res)).catch((error) => next(error))
}
}
