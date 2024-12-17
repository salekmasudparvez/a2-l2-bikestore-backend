import { Router } from 'express'
import orderController from './order.controller'

const orderRouter = Router()

orderRouter.post('/', orderController.orderProduct)
orderRouter.get('/revenue', orderController.getRevenueTotal)

export default orderRouter
