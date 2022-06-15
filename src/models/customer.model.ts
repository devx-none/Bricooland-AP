import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { customAlphabet } from "nanoid";


const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CustomerInput {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;

  
}

export interface CustomerDocument extends CustomerInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new mongoose.Schema(
  {
    CustomerId: {
      type: String,
      required: true,
      unique: true,
      default: () => `customer_${nanoid()}`,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
  },
  {
    timestamps: true,
  }
);

customerSchema.pre("save", async function (next) {
  let customer = this as CustomerDocument;

  if (!customer.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bcrypt.hashSync(customer.password, salt);

  customer.password = hash;

  return next();
});

customerSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const customer = this as CustomerDocument;

  return bcrypt.compare(candidatePassword, customer.password).catch((e) => false);
};
const CustomerModel = mongoose.model<CustomerDocument>(
  "Customer",
  customerSchema
);

export default CustomerModel;
