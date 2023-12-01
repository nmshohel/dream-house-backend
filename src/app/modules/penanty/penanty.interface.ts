/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';


export type IPenanty = {
  penantyDate: string;
  userName?: string;
  amount?: string;
  status:string;
};

export type PenantyModel = {
} & Model<IPenanty>;

export type PenantyFilters = {
    searchTerm?: string;
    userName?: string;
  

  };

