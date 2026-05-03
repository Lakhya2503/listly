import { createUserTable } from '../modules/user/user.table'

export const createTables = async() => {
  try {
      await createUserTable()
      console.error("🗃️  TABLE CREATE SUCCESSFULLY")
  } catch (error) {
      console.error("❌ table can't creates" + error)
  }
}
