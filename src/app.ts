import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/module/product/product.router'
import orderRouter from './app/module/order/order.router'
const app: Application = express()

app.use(express.json())
app.use('/api', userRouter)
app.use('/api/orders', orderRouter)
app.use(cors({
  origin:["https://a2-bike-backend-node.vercel.app","http://localhost:5000"]
}))


app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'server is live',
  })
})

export default app
