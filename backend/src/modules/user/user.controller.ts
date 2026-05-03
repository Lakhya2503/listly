import { ApiError } from "../../config/ApiError";
import { ApiResponse } from "../../config/ApiResponse";
import { asyncHandler } from "../../config/asyncHandler";
import { database } from "../../config/db";
import bcrypt from 'bcryptjs'

export const registerUser = asyncHandler(async(req,res)=>{


  const {
      name,
      email,
      password
  } = req.body;

  if(!name || !email || !password) {
    throw new ApiError(400, "all fields are required")
  }

  const userAlreadyExist:any = await database.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  )


  if(userAlreadyExist && userAlreadyExist.rows.length < 0) {
    throw new ApiError(400, "User already exist")
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const user = await database.query("INSERT INTO users (name,email,password) VALUES ($1, $2, $3) RETURNING * ",
    [name, email, hashPassword]
  )




    return res.status(200).json(new ApiResponse(201, user, "user created successfully"))
})


