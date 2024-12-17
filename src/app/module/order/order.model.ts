import { Model, model, Schema } from 'mongoose'
import { Iorder } from './order.interface'

const orderSchema = new Schema<Iorder>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        message: 'Please enter a valid email address',
      },
    },
    product: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
    quantity: {
      type: Number,
      required: [true, 'Please specify the bike quantity'],
    },
    totalPrice: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const Order: Model<Iorder> = model('orders', orderSchema)
export default Order
