const fs = require('fs').promises

class Clase {
    constructor(path) {
        this.path = path
    }

    async save(item) {
        try {
            const getData = await fs.readFile(this.path, 'utf-8')
            const data = JSON.parse(getData)
            let id
            data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1)
            const newItem = { ...item, id }
            data.push(newItem)
            await fs.writeFile(this.path, JSON.stringify(data, null, 4), 'utf-8')
            return newItem.id
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const getData = await fs.readFile(this.path, 'utf-8')
            const data = JSON.parse(getData)
            const filterData = data.filter(item => item.id === id)
            return filterData
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
            const filterData = data.filter(item => item.id !== id)
            await fs.writeFile(this.path, JSON.stringify(filterData, null, 4), 'utf-8')
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 4), 'utf-8')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Clase