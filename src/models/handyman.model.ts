import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";
import { CategoryDocument } from "./category.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface HandymanInput {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  category: CategoryDocument["_id"];
  email: string;
  password: string;
 
  
}

export interface HandymanDocument extends HandymanInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const handymanSchema = new mongoose.Schema(
  {
    HandymanId: {
      type: String,
      required: true,
      unique: true,
      default: () => `Handyman_${nanoid()}`,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   
  },
  {
    timestamps: true,
  }
);

handymanSchema.pre("save", async function (next) {
  let handyman = this as HandymanDocument;

  if (!handyman.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bcrypt.hashSync(handyman.password, salt);

  handyman.password = hash;

  return next();
});

handymanSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const handyman = this as HandymanDocument;

  return bcrypt.compare(candidatePassword, handyman.password).catch((e) => false);
};

const HandymanModel = mongoose.model<HandymanDocument>("Handyman", handymanSchema);

export default HandymanModel;
