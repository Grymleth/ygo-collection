import { QueryOptions } from "mongoose";
import ApiError from "../classes/ApiError";
import UserModel from "../models/user.model";

export const findUsers = async (
  query: QueryOptions,
  page: number,
  limit: number
) => UserModel.find(query);

export const findUserByEmail = (email: string) => UserModel.findOne({ email });

export const findUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const findUserById = (id: string) => UserModel.findById(id);

export const addUser = async (values: Record<string, any>) => {
  try {
    const newUser = await new UserModel(values).save();
    return newUser.toObject();
  } catch (error) {
    const apiError = new ApiError(error.message, 500);

    throw apiError;
  }
};

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, string>) =>
  UserModel.findByIdAndUpdate(id, values);
