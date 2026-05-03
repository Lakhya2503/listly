import express from "express"
import cors from 'cors'
import { ENV } from "./config/env";
import cookieParser from 'cookie-parser'
import { createTables } from "./config/createTables";

const app = express();

app.use(cors({
    origin : [ENV.CORS_ORIGIN],
    methods : ["GET","PUT","POST","DELETE","PATCH"],
    credentials : true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

createTables()

import BaseRouter from './routes/route'

app.use("/listly/api/v1" , BaseRouter)


export default app;
