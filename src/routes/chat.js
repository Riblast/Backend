import { Router } from 'express'
import { renderChat, renderUserMessages } from '../controller/chat.js'
export const chat = Router()

chat.get('/', renderChat)
chat.get('/:email', renderUserMessages)
