import mongoose from 'mongoose'
import config from '../config.js'
import { asPOJO, renameField, removeField } from './utils/ObjectUtils.js'

mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

console.log('base de datos iniciada')

const ERROR = { error : 'objeto no encontrado' }

class MongodbContainer {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema)
    }

    async save(item) {
        try {
            let doc = await this.collection.create(item)
            doc = asPOJO(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return doc
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const docs = await this.collection.find({ '_id': id }, { __v: 0 })
            if(docs.length === 0){
                return ERROR
            }
            else {
                const result = renameField(asPOJO(docs[0]), '_id', 'id')
                return result
            }        
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            let docs = await this.collection.find({}).lean()
            docs = docs.map(doc => renameField(doc, '_id', 'id'))
            return docs
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const { n, nDeleted } = await this.collection.deleteOne({ '_id': id })
            if (n === 0 || nDeleted === 0) {
                return ERROR
            }
        } catch (error) {
            console.log(error)
        }
    }
    async updateById(id, item){
        try {
            renameField(item)
            const { n, nModified } = await this.collection.replaceOne({ '_id': id}, item)
            if(n === 0 || nModified === 0) {
                return ERROR
            }
            else {
                renameField(item, '_id', 'id')
                removeField(item, '__v')
                return asPOJO(item)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export default MongodbContainer