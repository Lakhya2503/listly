import { Pool } from 'pg'
import { ENV } from './env'


export const database = new Pool({
    user: ENV.DATABASE_USERNAME,
    host: ENV.DATABASE_HOST,
    database : ENV.DATABASE_NAME,
    password : ENV.DATABASE_PASSWORD,
    port : ENV.DATABASE_PORT
})


const connectDb =  async ()=> {
 try {
      await database.connect()
      // console.log("📊 DATABASE CONNECTED SUCCESSFULLY "+ database)
      console.log("📊👍")
 } catch (error) {
      console.error("❌ ERROR ON CONNECTING DATABASE " + error);
      process.exit(1)
 }
}

connectDb()
