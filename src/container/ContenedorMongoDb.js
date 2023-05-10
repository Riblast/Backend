import transformMongoObject from '../utils/objectUtils.js'
import { logger } from '../utils/logger.js'
import MongoDBClient from '../classes/MongoDBClientClass.js'
import CustomError from '../classes/CustomErrorClass.js'

class ContenedorMongoDb {
  constructor (squema) {
    this.collection = squema
    this.connection = MongoDBClient.getInstance()
    this.connection.connect()
  }

  async listar (id) {
    try {
      const res = await this.collection.findOne({ _id: id })
      return transformMongoObject(res)
    } catch (error) {
      const objError = new CustomError(500, 'Error listar()', error)
      logger.error(objError)
      throw objError
    }
  }

  async listarAll () {
    try {
      const res = await this.collection.find({})
      if (res.length === 0) {
        return res
      } else {
        return transformMongoObject(res)
      }
    } catch (error) {
      const objError = new CustomError(500, 'Error listarAll()', error)
      logger.error(objError)
      throw objError
    }
  }

  async guardar (elemento) {
    try {
      const res = await this.collection.create(elemento)
      return transformMongoObject(res)
    } catch (error) {
      const objError = new CustomError(500, 'Error guardar()', error)
      logger.error(objError)
      throw objError
    }
  }

  async actualizar (id, elemento) {
    try {
      await this.collection.findByIdAndUpdate({ _id: id }, { $set: elemento })
      return elemento
    } catch (error) {
      const objError = new CustomError(500, 'Error actualizar()', error)
      logger.error(objError)
      throw objError
    }
  }

  async borrar (id) {
    try {
      const res = await this.collection.findByIdAndDelete({ _id: id })
      return res
    } catch (error) {
      const objError = new CustomError(500, 'Error borrar()', error)
      logger.error(objError)
      throw objError
    }
  }

  async borrarTodo () {
    try {
      const res = await this.collection.deleteMany()
      return res.acknowledged
    } catch (error) {
      const objError = new CustomError(500, 'Error borrarTodo()', error)
      logger.error(objError)
      throw objError
    }
  }
}

export default ContenedorMongoDb
