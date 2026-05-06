
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AccessTokenPayload {
  id: string;
  email: string;
}

export interface RefreshTokenPayload {
  id: string;
}

export interface jwtTokenType extends JwtPayload  {
  id : string,
  email : string
}

export interface AuthRequest extends Request {
  user: DbUser;
}


export interface userType {
            id: string,
            name:string ,
            email:string ,
            password:string,
            role?:string ,
            avatar?: string,
            refresh_token?:string ,
            reset_password_token?:string ,
            reset_password_expire?: Date,
            created_at: Date
}

export interface DbUser {
            id: string,
            name:string ,
            email:string ,
            password:string,
            role?:string ,
            avatar?: string,
            refresh_token?:string ,
            reset_password_token?:string ,
            reset_password_expire?: Date,
            created_at: Date
}
