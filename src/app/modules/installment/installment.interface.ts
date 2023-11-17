/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';


export type IInstallment = {
  email: string;
  month: string;
  year: string;
  amount:string;
};

export type InstallmentModel = {
} & Model<IInstallment>;

export type IInstallmentFilters = {
    searchTerm?: string;
    email?: string;
    month?: string;
    year?: string;

  };