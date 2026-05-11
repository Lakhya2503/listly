import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { database } from "../config/db";
import { ENV } from "../config/env";
import { AuthRequest, DbUser, jwtTokenType } from "../modules/user/user.types";
import { ApiError } from "../utils/ApiError";
import { findSafeUser } from '../utils/helper';

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

    const { safeUser } = await findSafeUser(decodedToken.id)

    if (!safeUser) {
      return next(new ApiError(401, "Token used or invalid"));
    }

    req.user = safeUser;

    next();
  } catch (error: any) {
    return next(new ApiError(401, error.message));
  }
};
