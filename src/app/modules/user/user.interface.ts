/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';


export type IUser = {
  id: string;
  role: string;
  password: string;
  name:string;
  email:string
};

export type UserModel = {
} & Model<IUser>;

export type IUserFilters = {
    searchTerm?: string;
    id?: string;
    name?: string;
    email?: string;

  };