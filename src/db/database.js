import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoBD Connected !!`)
    } catch (error) {
        console.log('MongoDB connection Failed', error)
        next(1)
    }
}

export default connectDB;