

export  const asyncHandler = (requestHandler: (arg0: any, arg1: any) => any ) => {
    return (req: any,res: any,next: (arg: any) => any)=> {
          Promise.resolve(requestHandler(req,res)).catch((error)=>next(error))
    }
}
