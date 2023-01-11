import admin from 'firebase-admin'
import config from '../config.js'

const ERROR = { error : 'objeto no encontrado' }

admin.initializeApp({credential: admin.credential.cert(config.firebase)})

const db = admin.firestore()

class FirebaseContainer {

    constructor(collectionName) {
        this.collection = db.collection(collectionName)
    }
    async save(item) {
        try {
            let timestamp = Date.now()
            const newItem = { timestamp, ...item }
            const data = await this.collection.add(newItem)
            return data.id
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get()
            if (doc.exists) {
                const data = doc.data()
                return data
            }
            else return ERROR
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const data = await this.collection.get()
            let docs = data.docs
            const response = docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const doc = await this.collection.doc(id).get()
            if(doc.exists){
                this.collection.doc(id).delete()
                return 'eliminado correctamente'
            }
            else return ERROR
        } catch (error) {
            console.log(error)
        }
    }
    async updateById(id, object) {
        try {
            const doc = await this.collection.doc(id).get()
            if(doc.exists){
                return this.collection.doc(id).set(object)
            }
            else return ERROR
        } catch (error) {
            console.log(error)
        }
    }
}

export default FirebaseContainer