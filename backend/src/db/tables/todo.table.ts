import { database } from "../../config/db";
import { ApiError } from "../../utils/ApiError";

export const todoTable = async () => {
  try {
    //  ? -- Extension Enble for UUID
    await database.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    //  ! -- Create Todo Table if It's not available
    await database.query(`
        CREATE TABLE IF NOT EXISTS todo (
              id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
              title VARCHAR(100) NOT NULL CHECK (char_length(title) >= 3),
              user_id UUID NOT NULL,
              created_at TIMESTAMP DEFAULT NOW(),
              updated_at TIMESTAMP DEFAULT NOW()
        )
    `);

    //  ! -- Create TodoList Table if It's not available
    await database.query(`
          CREATE TABLE IF NOT EXISTS todolist (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                todo_id UUID NOT NULL REFERENCES todo(id) ON DELETE CASCADE,
                task VARCHAR (500) NOT NULL CHECK(char_length(task)>=1),
                is_completed BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
          )
    `);

    // ** -- INDEX - for fast query
     await database.query(`
      CREATE INDEX IF NOT EXISTS idx_todolist_todo_id ON todolist(todo_id)
    `)

    await database.query(`
      CREATE INDEX IF NOT EXISTS idx_todo_user_id ON todo(user_id)
    `)

    console.log("📋✅ Todo & TodoList Tables created successfully");
  } catch (error: { message: string } | any) {
    console.error(" ❌ DB ERROR", error)
    throw new ApiError(400, " ❌ Todo Table can't create", error?.mesage);
  }
};
