import { configDotenv } from 'dotenv'

configDotenv({
  path : ".env",
  quiet : true
})

export const ENV = {
  PORT :  process.env.PORT,
  DB_URL : process.env.DB_URL,
  NODE_ENV : process.env.NODE_ENV,
  DATABASE_NAME  : process.env.DATABASE_NAME,
  DATABASE_HOST  : process.env.DATABASE_HOST,
  DATABASE_USERNAME  : process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD  : process.env.DATABASE_PASSWORD,
  DATABASE_PORT  : Number(process.env.DATABASE_PORT)
}
