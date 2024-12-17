import { Ibike } from './product.interface'
import User from './product.model'

const createProductFunc = async (payload: Ibike): Promise<Ibike> => {
  const updatePayload = {
    ...payload,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const result = await User.create(updatePayload)
  return result
}
const getProductsFunc = async (filter: object) => {
  const result = await User.find(filter)
  return result
}
const getSpecificProductFunc = async (productId: string): Promise<Ibike | null> => {
  const result: Ibike | null = await User.findById(productId)
  return result
}
const updateProductFunc = async (id: string, data: object) => {
  const updateDoc = {
    ...data,
    updatedAt: new Date(),
  }
  const result = await User.findByIdAndUpdate(id, updateDoc, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteSingleProductFunc = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const productService = {
  createProductFunc,
  getProductsFunc,
  getSpecificProductFunc,
  updateProductFunc,
  deleteSingleProductFunc,
}
