import bcrypt from "bcryptjs";
import { database } from "../../config/db";
import { ApiError } from "../../utils/ApiError";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";
import { DbUser, userType } from './user.types';
import uploadAvatar from "../../config/cloudinary";

const generateAccessRefreshToken  = async(user:any) => {
    try {

          const accessToken =  generateAccessToken(user)
          const refreshToken =  generateRefreshToken(user)

          const updatedUser = await database.query(
            `UPDATE users SET refreshToken = $1 WHERE id = $2 RETURNING *`,
            [refreshToken, user?.id]
          )

          if(!updatedUser) {
            throw new ApiError(404, "User can't find")
          }


        return {
              accessToken,
              refreshToken
        }
    } catch (error : {message : string} | any) {
        throw new ApiError(500, error.message)
    }

}

export const registerUserService = async ({
          name,
          email,
          password
      } : {
          name: string;
          email: string;
          password: string;
      }) => {

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const userAlreadyExist: any = await database.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (userAlreadyExist.rows.length > 0) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await database.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );

  const { accessToken, refreshToken } =
    await generateAccessRefreshToken(user.rows[0]);

  return {
    user: user.rows[0],
    accessToken,
    refreshToken
  };
};

export const loginUserService = async({
    email,
    password
    }:{
      email : string,
      password : string
  }) => {

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

  return {
    user : user.rows[0],
    accessToken,
    refreshToken,
  }
}

export const logoutUserService = (async(user:DbUser)=> {

   const userLogout = await database.query(`
            UPDATE users SET refreshToken =$1 WHERE id = $2 RETURNING *`,
            ["", user.id]
    )

    if(userLogout.rows.length < 0) {
      throw new ApiError(400, "User can't logout")
    }

})

export const userAvatarUpdateService = (async(user : userType, avatar : string )=>{

    if(!user) {
      throw new ApiError(400,"User not found")
    }
    console.log(user);


    if(!avatar) {
      throw new ApiError(400,"Avatar didn't find")
    }

   const { url } =  await  uploadAvatar(avatar)

   console.log("log", url);



    const findUser = await database.query(`
               UPDATE users SET avatar= $1 WHERE id = $2 RETURNING *`,
            [url, user.id]
      )

      console.log("findUser", findUser);


      if(findUser.rows[0] < 0) {
        throw new ApiError(400, "User avatar can't update")
      }


  return {
      findUser
  }
})

