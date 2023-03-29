import mongoose from "mongoose"
import { urlMongo } from "../config/config.js"
import CustomError from "./CustomErrorClass.js"
import DBClient from "./DBClientClass.js"
import { logger } from '../utils/logger.js'

class MongoDBClient extends DBClient {
    constructor() {
        super();
        this.connected = false
        mongoose.set('strictQuery', false)
    }

    async connect() {
        try {
            await mongoose.connect(urlMongo, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            this.connected = true

            logger.info("Base de datos MONGO conectada")
        } catch (error) {
            const objError = new CustomError(500, "Error al conectarse con MongoDB", error)
            logger.error(objError)
            throw objError
        }
    }

    async disconnect() {
        try {
            await mongoose.connection.close()
            this.connected = false
            logger.info("Base de datos MONGO desconectada")
        } catch (error) {
            const objError = new CustomError(500, "Error al desconectarse a mongodb", error)
            logger.error(objError)
            throw objError
        }
    }

    static instance = null;

    static getInstance() {
        if (!MongoDBClient.instance) {
            MongoDBClient.instance = new MongoDBClient()
        }
        return MongoDBClient.instance
    }
}

export default MongoDBClient