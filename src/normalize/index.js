import { normalize, schema, } from 'normalizr'

// Definimos un esquema de autor
const authorSchema = new schema.Entity('authors',{}, {idAttribute:'email'})

// Definimos un esquema de mensaje
const textSchema = new schema.Entity('text')

// Definimos un esquema de posts
const messagesSchema = new schema.Entity('messages', {
    author: authorSchema,
    text: [textSchema]
})

const normalizeMessages = (messages) => normalize(messages, [messagesSchema])

export { normalizeMessages }