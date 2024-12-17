import mongoose from 'mongoose'
import config from './app/config/index'
import app from './app'

async function server() {
  try {
    await mongoose.connect(config.url as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));
    app.listen(config.port, () => {
      console.log(`Server is runing on port ${config.port}`)
    })
  } catch (error) {
    console.log(error,'<<')
  }
}
server()
