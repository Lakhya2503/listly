import { configDotenv } from 'dotenv'

configDotenv({
  path : ".env",
  quiet : true
})

export const ENV = {
  PORT :  Number(process.env.PORT),
  DB_URL :  String(process.env.DB_URL),
  NODE_ENV :  String(process.env.NODE_ENV),
  DATABASE_NAME  : String(process.env.DATABASE_NAME),
  DATABASE_HOST  :  String(process.env.DATABASE_HOST),
  DATABASE_USERNAME  :  String(process.env.DATABASE_USERNAME),
  DATABASE_PASSWORD  : String(process.env.DATABASE_PASSWORD),
  DATABASE_PORT  : Number(process.env.DATABASE_PORT),
  CORS_ORIGIN : String(process.env.CORS_ORIGIN)
}
