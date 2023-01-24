import faker from 'faker'
faker.locale = 'es'

function createFakeProducts(n) {
    const products = []
    for (let i = 1; i <= n; i++) {
        const prod = createFakeProduct(i)
        products.push(prod)
    }
    return products
}

function createFakeProduct(id) {
    const product = {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: `${faker.image.imageUrl()}?${isNaN(id) ? 1 : id}`
    }
    if (id) {
        product.id = id
    }
    return product
}

export {
    createFakeProduct,
    createFakeProducts
}