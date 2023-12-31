import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { UserFilterableFields } from './user.constrant';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await UserService.createUser(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  }
);

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, UserFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
  
    const result = await UserService.getAllFromDB(
      filters,
      paginationOptions
    );
  
    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  });
  const getById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const result = await UserService.getById(id);
  
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully !',
      data: result,
    });
  });
  const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    const result = await UserService.updateIntoDB(id, updatedData);
  
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully !',
      data: result,
    });
  });


  const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const result = await UserService.deleteFromDB(id);
  
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully !',
      data: result,
    });
  });
export const UserController = {
  createUser,
  getAllFromDB,
  getById,
  updateIntoDB,
  deleteFromDB
};
