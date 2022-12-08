const fs = require('fs').promises

const ERROR = { error : 'carrito no encontrado' }

class CartFileContainer {
    constructor(path) {
        this.path = path
    }

    async createCart(cart){
        try{
            const getData = await fs.readFile(this.path, 'utf-8')
            const data = JSON.parse(getData)

            let id
            data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1)
            const newItem = { id, ...cart }
            data.push(newItem)
            await fs.writeFile(this.path, JSON.stringify(data, null, 4), 'utf-8')
            return id
        }catch(error){
            console.log(error)
        }
    }

    async deleteCart(id){
        try{
            const getData = await fs.readFile(this.path, 'utf-8')
            const data = JSON.parse(getData)

            const newCart = data.filter(cart => cart.id != id)

            await fs.writeFile(this.path, JSON.stringify(newCart, null, 4), 'utf-8')

        }catch(error){
            console.log(error)
        }
    }

    async getProducts(id){
        try {
            const getData = await fs.readFile(this.path, 'utf-8')
            const data = JSON.parse(getData)
            const cart = data.find(cart => cart.id === id)

            if(!cart){
                return null;
            } else {return cart.products};
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(prod, id){
        try {
            const getData = await fs.readFile(this.path, 'utf-8')
            const data = JSON.parse(getData)
            const cart = data.find(cart => cart.id === id)

            cart.products.push(prod)

            await fs.writeFile(this.path, JSON.stringify(data, null, 4), "utf-8")
            return cart.id
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProd(id, idProd){
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            let data = JSON.parse(leer)
            let cart = data.find (cart => cart.id === id)
            const newProds = cart.products.filter(prod => prod.id != idProd)
            cart.products = newProds

            await fs.writeFile(this.path, JSON.stringify(data, null, 4), "utf-8")
            return newProds
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = CartFileContainer