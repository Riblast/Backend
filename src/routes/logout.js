import { Router } from 'express'
import { getLogoutController } from '../controller/logout.js'

export const logout = Router()

logout.get('/', getLogoutController)
