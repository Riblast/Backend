import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } from "../src/services/httpClient.js"
import mongoose from "mongoose"

// Prueba para obtener todos los productos
obtenerProductos()
    .then((response) => {
        console.log('Productos obtenidos correctamente:');
        console.log(response)
        
        // Prueba para crear un nuevo producto
        const producto = {
            _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
            thumbnail: "url-de-la-imagen",
            title: "nombre-del-producto",
            price: 100.0
        }

        const productoActualizado = {
            thumbnail: "url-de-la-imagen",
            title: "nombre-del-producto-actualizado",
            price: 50.0
        }

        agregarProducto(producto)
            .then((response) => {
                console.log('Producto creado correctamente:');
                console.log(response);
                
                // Prueba para modificar un producto existente
                actualizarProducto('4edd40c86762e0fb12000003', productoActualizado)
                    .then((response) => {
                        console.log('Producto modificado correctamente:');
                        console.log(productoActualizado);

                        // Prueba para eliminar un producto existente
                        eliminarProducto('4edd40c86762e0fb12000003')
                            .then((response) => {
                                console.log('Producto eliminado correctamente:');
                                console.log(response);
                            })
                            .catch((error) => {
                                console.error('Error al eliminar el producto:');
                                console.error(error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error al modificar el producto:');
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error('Error al crear el producto:');
                console.error(error);
            });
    })
    .catch((error) => {
        console.error('Error al obtener los productos:');
        console.error(error);
    });