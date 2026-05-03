import { database } from '../../config/db';


const createUserTable =async function () {
  try {
      const query = `
          CREATE TABLE IF NOT EXIST users (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(100) NOT NULL CHECK (char length(name) >= 3),
            email VARCHAR(100) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(10) DEFAULT 'User' Check (role IN('User',  'Admin')),
            avatar JSONB DEAFULT NULL,
            reset_password_token TEXT DEFAULT NULL,
            reset_password_expire TIMESTAMP DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await database.query(query)
  } catch (error) {
        console.error("ERROR ON CREATING A TABLE" + error)
  }
}
