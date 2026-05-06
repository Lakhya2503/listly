import { database } from "../../config/db";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { loginUserService, registerUserService, logoutUserService, userAvatarUpdateService } from './user.service';
import { DbUser } from './user.types';

const options = {
    httpOnly : true,
    secure : true
}

export const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  const { user, accessToken, refreshToken } =
    await registerUserService({ name, email, password });

  return res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        { user },
        "User registered successfully"
      )
    );
});

export const loginUser =  asyncHandler(async(req,res)=>{

  const { email, password } = req.body

  const { user, accessToken, refreshToken } = await loginUserService({email, password});

  return res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(new ApiResponse(200, {
      user,
      "accessToken": accessToken,
      "refreshToken": refreshToken,
  }, "User logged in successfully"))
})

export const logoutUser =  asyncHandler(async(req,res)=>{

  // ? TODO : logout functionality

  await logoutUserService(req.user)

  return res
  .status(200)
  .cookie("accessToken", options)
  .cookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged out successfully"))
})

export const getUser =  asyncHandler(async(req,res)=>{

    const user =  req.user

  return res.status(200).json(new ApiResponse(200, user, "User fetchsuccessfully"))
})

export const updateUserAvatar = asyncHandler(async(req,res)=>{

   const  avatar  = req.files.avatar[0].path
  const user = req.user

  await userAvatarUpdateService(user,avatar)

  return res.status(200).json(new ApiResponse(200,{}, "User Avatar Update Successfully"))
})
