import mongoose from 'mongoose'
import usersModel from '../models/usersModel.js'
import utilsSession from './UtilsSession.js'

class SessionService {
    constructor() {
        this.url = 'mongodb+srv://admin:adminpwd@cluster0.nieryoj.mongodb.net/ecommerce?retryWrites=true&w=majority'
        this.mongodb = mongoose.connect
    }

    async connectDB() {
        await this.mongodb(this.url)
    }

    async searchUserByEmail(email) {
        await this.connectDB()
        const user = await usersModel.findOne({ email })
        return user
    }

    async registerUser(user) {
        await this.connectDB()
        const userExist = await usersModel.findOne({ email: user.email })
        if (userExist) return false
        user.password = utilsSession.createHash(user.password)
        const newUser = new usersModel(user)
        await newUser.save()
        return true
    }
}
export default SessionService