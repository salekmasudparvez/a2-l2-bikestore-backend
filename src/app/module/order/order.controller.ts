import { Request, Response } from 'express'
import { orderService } from './order.service'
import { Ibike } from '../product/product.interface'
import { productService } from '../product/product.service'

const orderProduct = async (req: Request, res: Response) => {
  try {
    const getOrder = req.body
    const { product, quantity } = getOrder
    const targetProduct: Ibike | null =
      await productService.getSpecificProductFunc(product)

    if (!targetProduct) {
      res.status(404).send({
        message: 'Failed to find product',
        status: false,
      })
      return
    }
    if (targetProduct?.quantity === quantity) {
      const updateDoc = { inStock: false }
      const updateStock = await productService.updateProductFunc(product, updateDoc)
      if (!updateStock) {
        res.send({
          message: 'Failed to update stock status',
          status: false,
        })
        return
      }
    }
    if (targetProduct?.inStock === true && targetProduct?.quantity > 0) {
      const decrementQuantity = {
        $inc: { quantity: -quantity },
      }

      const updateQuantity = await productService.updateProductFunc(
        product,
        decrementQuantity,
      )
      if (!updateQuantity) {
        res.send({
          message: 'Failed to order',
          status: false,
        })
        return
      }

      const orderPlaced = {
        ...getOrder,
        totalPrice: quantity * targetProduct?.price,
      }
      const createOrder = await orderService.orderProduct(orderPlaced)

      res.send({
        message: 'Order created successfully',
        status: true,
        data: createOrder,
      })
    } else {
      res.send({
        message: 'Insufficient stock',
        status: false,
      })
    }
  } catch (error) {
    res.send({
      message: 'Failed to order',
      status: false,
      data: error,
    })
  }
}
const getRevenueTotal = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calculateRevenueTotal()
    res.send({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    })
  } catch (error) {
    res.send({
      message: 'Failed to get revenue total',
      status: false,
      data: error,
    })
  }
}

export default {
  orderProduct,
  getRevenueTotal,
}
