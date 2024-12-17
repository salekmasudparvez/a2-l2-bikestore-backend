import { Document } from 'mongoose';

export enum BikeCategory {
  Mountain = 'Mountain',
  Road = 'Road',
  Hybrid = 'Hybrid',
  Electric = 'Electric',
}

export interface Ibike extends Document {
  name: string;
  brand: string;
  price: number;
  category: BikeCategory;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date; 
  updatedAt?: Date;
}
