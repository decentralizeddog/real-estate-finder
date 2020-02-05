import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Apartment Schema for TypeScript.
 * @param name:string
 * @param description:string
 * @param size:number
 * @param price:number
 * @param roomNums:number
 * @param realtorId:string
 * @param created:date
 */
export interface IApartment extends Document {
  name: string;
  description: string;
  size: number;
  price: number;
  roomNums: number;
  realtorId: string;
  rented: boolean;
  created: Date;
  coordinates: Array<number>;
}

const apartmentSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  size: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  roomNums: {
    type: Number,
    required: true,
  },
  realtorId: {
    type: String,
    required: true,
  },
  rented: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});

export const Apartment: Model<IApartment> = model("Apartment", apartmentSchema);
