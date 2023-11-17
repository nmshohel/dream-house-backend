/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';


export type IUser = {
  role: string;
  password: string;
  name:string;
  userName:string
};

export type UserModel = {
} & Model<IUser>;

export type IUserFilters = {
    searchTerm?: string;
    id?: string;
    name?: string;
    email?: string;

  };