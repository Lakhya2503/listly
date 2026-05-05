import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { database } from "../config/db";
import { ENV } from "../config/env";
import { AuthRequest, DbUser, jwtTokenType } from "../modules/user/user.types";
import { ApiError } from "../utils/ApiError";

export const verifyJWT = async (
      req:AuthRequest,
      res: Response,
      next: NextFunction
    ) => {
       const token = req.cookies?.accessToken;

      if (!token ) {
        return next(new ApiError(401, "token not found."));
      }

  try {

    const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET);

    if (typeof decoded === "string") {
      return next(new ApiError(401, "Invalid token"));
    }

    const decodedToken = decoded as jwtTokenType;

    const user = await database.query(
      `SELECT * FROM users WHERE id = $1`,
      [decodedToken.id]
    );

    const requser: DbUser = user.rows[0];

    if (!requser) {
      return next(new ApiError(401, "Token used or invalid"));
    }

    req.user = requser;

    next();
  } catch (error: any) {
    return next(new ApiError(401, error.message));
  }
};
