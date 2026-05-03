import app from './app'
import { ENV } from './config/env'

const port = ENV.PORT || 5000;

app.listen(port,()=>{
  console.log("🚀 SERVER LISTNING ON PORT : ", port)
})
