/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';


export type IInterest = {
  amount: string;
  month?: string;
  year?: string;
  status:string;
};

export type InterestModel = {
} & Model<IInterest>;

export type IInterestFilters = {
    searchTerm?: string;
    month?: string;
    year?: string;

  };

