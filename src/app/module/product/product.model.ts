import { Model, model, Schema } from 'mongoose';
import { Ibike, BikeCategory } from './product.interface';

const bikeSchema = new Schema<Ibike>(
  {
    name: {
      type: String,
      required: [true, 'Please enter the bike name'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
      minlength: [3, 'Name must be at least 3 characters long'],
    },
    brand: {
      type: String,
      required: [true, 'Please specify the bike brand'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter the bike price'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      enum: BikeCategory,
      required: [true, 'Please specify the bike category'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please specify the quantity'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Please specify whether the bike is in stock'],
    },
  },
  {
    timestamps: true, 
    versionKey: false, 
  }
);

const Bike: Model<Ibike> = model('Bike', bikeSchema);

export default Bike;
