import bcrypt from 'bcryptjs';
import { ApiError } from "../../config/ApiError";
import { ApiResponse } from "../../config/ApiResponse";
import { asyncHandler } from "../../config/asyncHandler";
import { database } from "../../config/db";
import { generateAccessToken, generateRefreshToken } from './user.table';

const options = {
    httpOnly : true,
    secure : true
}

const generateAccessRefreshToken  = async(user:any) => {

    const accessToken =  generateAccessToken(user)
    const refreshToken =  generateRefreshToken(user)

  return {
        accessToken,
        refreshToken
  }

}

export const registerUser = asyncHandler(async(req,res)=>{

    /*
     ? TODO : Register functionality
    */

  const {
      name,
      email,
      password
  } = req.body;

  if(!name || !email || !password) {
    throw new ApiError(400, "all fields are required")
  }

      const userAlreadyExist:any = await database.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );


    if(userAlreadyExist && userAlreadyExist.rows.length > 0) {
      throw new ApiError(400, "User already exist")
    }

  const hashPassword = await bcrypt.hash(password, 10)

      const user = await database.query("INSERT INTO users (name,email,password) VALUES ($1, $2, $3) RETURNING * ",
        [name, email, hashPassword]
      )


    const { accessToken, refreshToken} = await generateAccessRefreshToken(user.rows[0])

  return res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
   .json(new ApiResponse(201, {
    user : user.rows[0],
  }, "User Register successfully"))
})

export const loginUser =  asyncHandler(async(req,res)=>{

  // ? TODO : login functionality

  const { email, password } = req.body

  console.log("email", email);
  console.log("password", password);

  if(!email || !password) {
    throw new ApiError(404, "email and password are required")
  }

  const user = await database.query(
    `SELECT * FROM users WHERE email = $1`, [
      email,
    ]
  );
  const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password)

  if(!isPasswordCorrect) {
    throw new ApiError(401, "Credentials faild please try again some time....")
  }

  const { accessToken, refreshToken} = await generateAccessRefreshToken(user.rows[0])

  console.log("user", user.rows[0]);

  return res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(new ApiResponse(200, {
    user : user.rows[0],
    "accessToken" : accessToken,
    "refreshToken": refreshToken,
  }, "User logged In successfully"))
})

export const logoutUser =  asyncHandler(async(req,res)=>{

  // ? TODO : logout functionality

  return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"))
})

export const getUser =  asyncHandler(async(req,res)=>{

  // ? TODO : fetch user functionality

  return res.status(200).json(new ApiResponse(200, {}, "User fetchsuccessfully"))
})
