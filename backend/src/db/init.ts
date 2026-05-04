import { createUserTable } from './tables/user.table';

export const createTables = async() => {
  try {
      await createUserTable()
      console.error("🗃️  TABLES CREATE SUCCESSFULLY")
  } catch (error) {
      console.error("❌ table can't creates" + error)
  }
}
