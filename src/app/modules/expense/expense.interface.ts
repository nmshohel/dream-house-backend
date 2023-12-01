/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';


export type IExpense = {
  expenseDate: Date;
  description: string;
  quantity?: string;
  unit?: string;
  unitPrice?: string;
  totalPrice: string;
  expenseBy:string
  status:string;
  remarks?:string;
};

export type ExpenseModel = {
} & Model<IExpense>;

export type ExpenseFilters = {
    searchTerm?: string;
    expenseBy?: string;
  

  };

