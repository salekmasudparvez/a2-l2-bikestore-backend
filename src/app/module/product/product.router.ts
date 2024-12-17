import { Router } from 'express'
import  {productControl}  from './product.controller'

const userRouter = Router()

userRouter.post('/products', productControl.createPruduct)
userRouter.get('/products', productControl.getProduct)
userRouter.get('/products/:productId', productControl.getSpecificProduct)
userRouter.put('/products/:productId', productControl.updateProduct)
userRouter.delete('/products/:productId', productControl.deleteSingleProduct)

export default userRouter
