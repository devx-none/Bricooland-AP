import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import HandymanModel, {
  HandymanDocument,
  HandymanInput,
} from "../models/handyman.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createHandyman(input: HandymanInput) {
  const metricsLabels = {
    operation: "createHandyman",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await HandymanModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findHandyman(
  query: FilterQuery<HandymanDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findHandyman",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await HandymanModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findHandymenByCategory ( query : FilterQuery<HandymanDocument>, options : QueryOptions = {lean:true} ) {
  const metricsLabels = {
    operation: "findHandymenByCategory",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await HandymanModel.find(query, {}, options).populate("category");
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateHandyman(
  query: FilterQuery<HandymanDocument>,
  update: UpdateQuery<HandymanDocument>,
  options: QueryOptions
) {
  return HandymanModel.findOneAndUpdate(query, update, options);
}

export async function deleteHandyman(query: FilterQuery<HandymanDocument>) {
  return HandymanModel.deleteOne(query);
}
