import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  url: process.env.DB_url,
  port: process.env.PORT,
}
