import { Request } from "express";
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

export const deleteUserById = (req: Request) => {
  const { id } = req.params;
  const deletedUser = UserModel.findOneAndDelete({ _id: id });

  return deletedUser;
};

export const updateUserById = async (req: Request) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    throw new ApiError("Missing parameters", 400);
  }

  const user = await UserModel.findById(id);

  user.username = username;
  const updatedUser = user.save();

  return updatedUser;
};
