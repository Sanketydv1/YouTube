import dotenv from 'dotenv'
import connectDB from './db/database.js'
import app from './app.js'

dotenv.config()

const startServer = () => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is Running at PORT:${process.env.PORT || 8000}`)
    })
}

connectDB()
    .then(() => {
        console.log('Database connected successfully !!')
    })
    .catch((err) => {
        console.log('MongoDb Connection Failed !!', err)
    })
    .finally(() => {
        startServer()
    })