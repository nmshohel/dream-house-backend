import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ExpenseFilterableFields } from './expense.constrant';
import { IExpense } from './expense.interface';
import { ExpenseService } from './expense.service';

const createExpense: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await ExpenseService.createExpense(userData);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Expense created successfully!',
      data: result,
    });
  }
);

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ExpenseFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
  
    const result = await ExpenseService.getAllFromDB(
      filters,
      paginationOptions
    );
  
    sendResponse<IExpense[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Expense fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  });



  const getById= catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

  
    const result = await ExpenseService.getById(id);
  
    sendResponse<IExpense>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Expense fetched successfully !',
      data: result,
    });
  });
  const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    const result = await ExpenseService.updateIntoDB(id, updatedData);
  
    sendResponse<IExpense>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Expense updated successfully !',
      data: result,
    });
  });


  const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const result = await ExpenseService.deleteFromDB(id);
  
    sendResponse<IExpense>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Expense deleted successfully !',
      data: result,
    });
  });
export const ExpenseController = {
  createExpense,
  getAllFromDB,
  updateIntoDB,
  deleteFromDB,
  getById,
};
