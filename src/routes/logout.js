import { Router } from 'express'
import { getLogoutController } from '../controller/logout.js'
//import { authenticate } from '../middleware/passport.js';



export const logout = Router();


logout.get('/' ,  getLogoutController)
