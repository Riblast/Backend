const fs = require('fs').promises

const ERROR = { error : 'producto no encontrado' }

class FileContainer {
    constructor(path) {
        this.path = path
    }

    async save(item) {
        try {
            const getData = await fs.readFile(this.path, 'utf-8')
            const data = JSON.parse(getData)
            let id
            let timestamp = Date.now()
            data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1)
            const newItem = { id, timestamp, ...item }
            data.push(newItem)
            await fs.writeFile(this.path, JSON.stringify(data, null, 4), 'utf-8')
            return newItem
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const getData = await fs.readFile(this.path, 'utf-8')
            const data = JSON.parse(getData)
            const filterData = data.find(item => item.id === id)
            if(filterData){
                return filterData
            }
            else return ERROR          
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const getData = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(getData)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const getData = await fs.readFile(this.path, 'utf-8')
            const data = JSON.parse(getData)
            const foundItem = data.find(item => item.id === id)
        if(foundItem){
            const filterData = data.filter(item => item.id !== id)
            await fs.writeFile(this.path, JSON.stringify(filterData, null, 4), 'utf-8')
            return 'producto eliminado'
        }
        else return ERROR
        } catch (error) {
            console.log(error)
        }
    }
    async updateById(id, item){
        const getData = await fs.readFile(this.path, 'utf-8')
        const data = JSON.parse(getData)
        const foundItem = data.find(item => item.id === id)
        if(foundItem){
            const filterData = data.filter(item => item.id !== id) 
            const newItem = { id, ...item }
            filterData.push(newItem)
            await fs.writeFile(this.path, JSON.stringify(filterData, null, 4), 'utf-8')
            return newItem
        }
        else return ERROR
    }
}

module.exports = FileContainer