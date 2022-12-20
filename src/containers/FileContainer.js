import knexConection from "../client/knexConection.js"


class FileContainer {

    constructor(table){
        this.table = table
    }
    async save(item) {
        try {
            const ids = await knexConection(this.table).insert(item)
            return ids
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            return knexConection(this.table).where("id", id).select("*")
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return knexConection(this.table).select("*").limit(15)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            return knexConection(this.table).where("id", id).delete()
        } catch (error) {
            console.log(error)
        }
    }
    async updateById(id, product){
        try {
            const dbid = await knexConection(this.table).where("id", id).update(product)
            return dbid
        } catch (error) {
            console.log(error)
        }
    }
}

export default FileContainer