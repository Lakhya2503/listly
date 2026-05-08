import { todoTable } from './tables/todo.table';
import { createUserTable } from './tables/user.table';

export const createTables = async() => {
  try {
      await createUserTable()
      await todoTable()
      // console.log("🗃️  TABLES CREATE SUCCESSFULLY")
      console.log("🗃️ 👍 ")
  } catch (error) {
      console.error("❌ table can't creates" + error)
  }
}
