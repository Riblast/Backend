import mongoose from 'mongoose'
import config from '../config.js'

mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

console.log('base de datos iniciada')

const ERROR = { error : 'objeto no encontrado' }

class MongodbContainer {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema)
    }

    async save(item) {
        try {
            const product = new this.collection(item)
            const result = await product.save()
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const data = await this.collection.find({ '_id': id })
            if(data){
                return data
            }
            else{
                return ERROR
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const data = await this.collection.find()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            await this.collection.deleteOne({_id: id})
            return 'Objeto eliminado'
        } catch (error) {
            console.log(error)
        }
    }
    async updateById(id, item){
        try {
            await this.collection.updateOne({_id: id},{
                $set: item
            })
            return 'Objeto actualizado'
        } catch (error) {
            console.log(error)
        }
    }
}
export default MongodbContainer