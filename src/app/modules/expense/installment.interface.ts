/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';


export type IInstallment = {
  userName: string;
  month?: string;
  year?: string;
  installmentType:'monthly' | 'one time';
  amount:string;
  status:string;
};

export type InstallmentModel = {
} & Model<IInstallment>;

export type IInstallmentFilters = {
    searchTerm?: string;
    email?: string;
    month?: string;
    year?: string;

  };

export type IInstallmentType=['monthly' | 'one time']