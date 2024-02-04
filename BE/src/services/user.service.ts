import { QueryOptions } from "mongoose";
import ApiError from "../classes/ApiError";
import UserModel from "../models/user.model";

export const findUsers = async (
  query: QueryOptions,
  page: number,
  limit: number
) => {
  try {
    const users = await UserModel.find(query);

    return users;
  } catch (error) {
    throw new ApiError("Error while Paginating Users");
  }
};
