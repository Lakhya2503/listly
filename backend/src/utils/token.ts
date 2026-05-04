import jwt from 'jsonwebtoken';
import { ENV } from "../config/env";
import { AccessTokenPayload, RefreshTokenPayload } from '../modules/user/user.types'


export const generateAccessToken = (incomingPaylod : AccessTokenPayload):string => {

  const payload = {
      id : incomingPaylod.id,
      email : incomingPaylod.email
  }

    return jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET  , {
      expiresIn : 1 * 60 * 60
    });
}

export const generateRefreshToken = (incomingPaylod : RefreshTokenPayload) :string => {

    const payload = {
      id : incomingPaylod.id
  }

  return jwt.sign(payload,ENV.REFRESH_TOKEN_SECRET , {
      expiresIn : 5 * 24 * 60 * 60
    });
}
