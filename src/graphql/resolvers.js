import ProductosDaoMongoDb from "../daos/productos/ProductosDaoMongoDb.js"

const productosDao = new ProductosDaoMongoDb()

export async function obtenerProductos() {
    const prods = await productosDao.listarAll();

    return prods;
}

export async function obtenerProducto({ id }) {
    const prod = await productosDao.listar(id);

    return prod;
}

export async function agregarProducto(producto) {
    const prod = await productosDao.guardar(producto);

    return prod;
}

export async function actualizarProducto({ id, producto }) {
    const prod = await productosDao.actualizar(id, producto);

    return prod;
}

export async function eliminarProducto({ id }) {
    const prod = await productosDao.listar(id);

    await productosDao.borrar(id);

    return prod;
}