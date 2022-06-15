import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";
import { CategoryDocument } from "./category.model";
import { HandymanDocument } from "./handyman.model";
import { CustomerDocument } from "./customer.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ServiceInput {
  customer: mongoose.Types.ObjectId | CustomerDocument["_id"];
  handyman: mongoose.Types.ObjectId | HandymanDocument["_id"];
  category: mongoose.Types.ObjectId | CategoryDocument["_id"];
  title: string;
  description: string;
  statue: string;

}

export interface ServiceDocument extends ServiceInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new mongoose.Schema(
  {
    serviceId: {
      type: String,
      required: true,
      unique: true,
      default: () => `category_${nanoid()}`,
    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    handyman: { type: mongoose.Schema.Types.ObjectId, ref: "Handyman" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

    title: { type: String, required: true },
    description: { type: String, required: true },
    statue: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    }
    
  },
  {
    timestamps: true,
  }
);

const ServiceModel = mongoose.model<ServiceDocument>("Service", serviceSchema);

export default ServiceModel;
