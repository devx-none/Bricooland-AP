import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ServiceModel, {
  ServiceDocument,
  ServiceInput,
} from "../models/service.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createService(input: ServiceInput) {
  const metricsLabels = {
    operation: "createService",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result:any = await ServiceModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findService(
  query: FilterQuery<ServiceDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findService",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ServiceModel.find(query, {}, options).populate({ path: "category", select: 'category' });
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

//perform mission
export async function getMissions( 
  query: FilterQuery<ServiceDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "MyMission",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ServiceModel.find(query, {}, options).populate({ path: "category", select: 'category' }).populate({ path: "customer", select: 'firstName lastName phone' });
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}


export async function findAndUpdateService(
  query: FilterQuery<ServiceDocument>,
  update: UpdateQuery<ServiceDocument>,
  options: QueryOptions
) {
  return ServiceModel.findOneAndUpdate(query, update, options);
}

export async function deleteService(query: FilterQuery<ServiceDocument>) {
  return ServiceModel.deleteOne(query);
}
