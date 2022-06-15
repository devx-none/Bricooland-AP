import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CustomerModel, {
  CustomerDocument,
  CustomerInput,
} from "../models/customer.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createCustomer(input: CustomerInput) {
  const metricsLabels = {
    operation: "createCustomer",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await CustomerModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findCustomer(
  query: FilterQuery<CustomerDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findCustomer",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await CustomerModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateCustomer(
  query: FilterQuery<CustomerDocument>,
  update: UpdateQuery<CustomerDocument>,
  options: QueryOptions
) {
  return CustomerModel.findOneAndUpdate(query, update, options);
}

export async function deleteCustomer(query: FilterQuery<CustomerDocument>) {
  return CustomerModel.deleteOne(query);
}
