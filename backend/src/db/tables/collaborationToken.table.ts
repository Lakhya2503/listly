import { database } from "../../config/db";

export const collaborationTokenTable =async function () {
  try {
      const query = `
          CREATE TABLE IF NOT EXISTS collaborationToken (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(100) NOT NULL CHECK (char_length(name) >= 3),
            email VARCHAR(100) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(10) DEFAULT 'User' Check (role IN('User',  'Admin')),
            avatar JSONB DEFAULT NULL,
            refreshtoken TEXT DEFAULT NULL,
            reset_password_token TEXT DEFAULT NULL,
            reset_password_expire TIMESTAMP DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await database.query(query)
      // console.log("👤✅ User Tables created successfully");
      console.log("👤👍");
  } catch (error : {message : string} | any) {
        console.error("❌ Failed to create tables:", error.message);
  }
}
