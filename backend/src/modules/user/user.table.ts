import { database } from '../../config/db';
import jwt from 'jsonwebtoken'
import { ENV } from '../../config/env';
import { AccessTokenPayload, RefreshTokenPayload } from '../../config/type';


export const createUserTable =async function () {
  try {
      const query = `
          CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(100) NOT NULL CHECK (char_length(name) >= 3),
            email VARCHAR(100) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(10) DEFAULT 'User' Check (role IN('User',  'Admin')),
            avatar JSONB DEFAULT NULL,
            refresh_token TEXT DEFAULT NULL,
            reset_password_token TEXT DEFAULT NULL,
            reset_password_expire TIMESTAMP DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await database.query(query)
      console.log("👤  USER TABLE CREATED SUCCESSFULLY ")
  } catch (error) {
        console.error("❌ ERROR ON CREATING A TABLE " + error)
  }
}

console.log("ENV.ACCESS_TOKEN_SECRET" ,ENV.ACCESS_TOKEN_SECRET);
console.log("ENV.REFRESH_TOKEN_SECRET" ,ENV.REFRESH_TOKEN_SECRET);


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
