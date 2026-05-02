import express from "express"
import { ENV } from './config/env';

const app = express();

const port:number= 3000;


app.get("/",(_ : any,res :any)=>{
      res
      .status(200)
      .json(
        {
          message : "success",
          api : "api/v1/listly",
          listy : "api/v1/listly"
        }
      )
})

app.listen(ENV.PORT,()=>{
  console.log("⚙️  SERVER LISTNING ON PORT : ", ENV.PORT)
})
