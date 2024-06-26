import { Router } from 'express'
import { mainController, rateController, subscriptionController } from '../controllers/index.controller.js'

const router = Router()

router.get('/', mainController)
router.get('/rate', rateController)
router.post('/subscribe', subscriptionController)

export default router
