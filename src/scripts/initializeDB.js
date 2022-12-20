import knexConection from "../client/knexConection.js";

(async () => {
    try {
        console.log("inicializing migrate script...")
        await knexConection.schema.dropTableIfExists('products')
        await knexConection.schema.dropTableIfExists('messages')

        await knexConection.schema.createTable("products", (table) => {
            table.increments("id").primary()
            table.string("productName").notNullable()
            table.string("productPrice").notNullable()
            table.string("productPhoto").notNullable()
        })
        await knexConection.schema.createTable("messages", (table) => {
            table.increments("id").primary()
            table.string("user").notNullable()
            table.string("message").notNullable()
        })
    }
    catch(error){
        console.log(error)
    }
    finally{
        console.log("finalizing migrate script...")
        knexConection.destroy()
    }
})()