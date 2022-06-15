import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { HandymanDocument } from "./handyman.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CategoryInput {
  category: string;
}

export interface CategoryDocument extends CategoryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
      default: () => `category_${nanoid()}`,
    },
    category: { type: String, required: true },
    handyman: [{type:mongoose.Schema.Types.ObjectId, ref:"Handyman"}],
   
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<CategoryDocument>("Category", categorySchema);

export default CategoryModel;
