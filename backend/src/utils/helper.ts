import { database } from "../config/db";


export const findSafeUser = async (userId : string) => {

    const safeUser = await database.query(
      `SELECT id, name, email, avatar, role, created_at FROM users
     WHERE id = $1`,
      [userId]
    );

  return {
    safeUser : safeUser.rows[0]
  }
}


