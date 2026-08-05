import dns from 'node:dns'
import dotenv from 'dotenv'
import connectDB from './db/database.js'
import app from './app.js'

dns.setDefaultResultOrder('ipv4first')
dns.setServers(['8.8.8.8', '1.1.1.1'])

dotenv.config()

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is Running at PORT:${process.env.PORT || 8000}`)
        })
    })
    .catch((err) => {
        console.log('MongoDb Connection Failed !!', err)
    })