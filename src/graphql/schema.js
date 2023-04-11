import { buildSchema } from 'graphql'

const ProductosSchema = buildSchema(`
    type Producto {
        id: ID!,
        title: String,
        price: Int,
        description: String,
        thumbnail: String, 
        stock: Int,
    }
    input ProductoInput {
        title: String,
        price: Int,
        description: String,
        thumbnail: String,
        stock: Int,
    }
    type Query {
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!): Producto
    }
    type Mutation {
        agregarProducto(
            title: String!, 
            price: Int!, 
            description: String!, 
            thumbnail: String!, 
            stock: Int!
        ): Producto
        
        actualizarProducto(
            id: ID!, 
            producto: ProductoInput
        ): Producto
        eliminarProducto(id: ID!): Producto
    }
`)

export default ProductosSchema