import { Iorder } from './order.interface'
import Order from './order.model'

const orderProduct = async (getOrder: Iorder) => {
  const orderDoc = {
    ...getOrder,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const result = await Order.create(orderDoc)
  return result
}
const calculateRevenueTotal = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ])
  return result[0]?.totalRevenue || 0
}

export const orderService = {
  orderProduct,
  calculateRevenueTotal,
}
