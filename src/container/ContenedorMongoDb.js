import transformMongoObject from '../utils/objectUtils.js'
import { logger } from '../utils/logger.js'
import MongoDBClient from '../classes/MongoDBClientClass.js'
import CustomError from '../classes/CustomErrorClass.js'

class ContenedorMongoDb {
    constructor (squema) {
        this.collection = squema
        this.connection = MongoDBClient.getInstance()
    }

    async listar(id) {
        try {
            await this.connection.connect()
            const res = await this.collection.find({_id: id})
            return transformMongoObject(res)
        } catch (error) {
            const objError = new CustomError(500, 'Error listar()', error)
            logger.error(objError)
            throw objError
        } finally {
            this.connection.disconnect()
        }
        
    }

    async listarAll() {
        try {
            await this.connection.connect()
            const res = await this.collection.find({})
            if(res.length == 0){
                return res
            }else{
                return transformMongoObject(res)
            }
        } catch (error) {
            const objError = new CustomError(500, 'Error listarAll()', error)
            logger.error(objError)
            throw objError
        } finally {
            this.connection.disconnect()
        }
    }

    async guardar(elemento) {
        try {
            await this.connection.connect()
            const res = await this.collection.create(elemento)
            return transformMongoObject(res)
        } catch (error) {
            const objError = new CustomError(500, 'Error guardar()', error)
            logger.error(objError)
            throw objError
        } finally {
            this.connection.disconnect()
        }
    }

    async actualizar(id, elemento) {
        try {
            await this.connection.connect()
            const res = await this.collection.updateOne({_id: id} , { $set: elemento })
            return res.acknowledged
        } catch (error) {
            const objError = new CustomError(500, 'Error actualizar()', error)
            logger.error(objError)
            throw objError
        } finally {
            this.connection.disconnect()
        }
    }

    async borrar(id) {
        try {
            await this.connection.connect()
            const res = await   this.collection.deleteOne({_id: id})
            return res.acknowledged
        } catch (error) {
            const objError = new CustomError(500, 'Error borrar()', error)
            logger.error(objError)
            throw objError
        } finally {
            this.connection.disconnect()
        }
    }

    async borrarTodo() {
        try {
            await this.connection.connect()
            const res = await   this.collection.deleteMany()
            return res.acknowledged
        } catch (error) {
            const objError = new CustomError(500, 'Error borrarTodo()', error)
            logger.error(objError)
            throw objError
        } finally {
            this.connection.disconnect()
        }
    }
}

export default ContenedorMongoDb
