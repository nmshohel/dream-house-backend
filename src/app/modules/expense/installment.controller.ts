import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { InstallmentFilterableFields } from './installment.constrant';
import { IInstallment } from './installment.interface';
import { InstallmentService } from './installment.service';


const createInstallment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await InstallmentService.createInstallment(userData);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Installment created successfully!',
      data: result,
    });
  }
);

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, InstallmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
  
    const result = await InstallmentService.getAllFromDB(
      filters,
      paginationOptions
    );
  
    sendResponse<IInstallment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Installment fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  });

  const getAllFromDBByStatusPending = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, InstallmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
  
    const result = await InstallmentService.getAllFromDBByStatusPending(
      filters,
      paginationOptions
    );
  
    sendResponse<IInstallment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Installment fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  });
const getByUser = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, InstallmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const userName = req.params.userName;
    const result = await InstallmentService.getByUser(
      filters,
      paginationOptions,
      userName
    );
  
    sendResponse<IInstallment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Installment fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  });
  const getById= catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

  
    const result = await InstallmentService.getById(id);
  
    sendResponse<IInstallment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Installment fetched successfully !',
      data: result,
    });
  });
  const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    const result = await InstallmentService.updateIntoDB(id, updatedData);
  
    sendResponse<IInstallment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Installment updated successfully !',
      data: result,
    });
  });


  const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const result = await InstallmentService.deleteFromDB(id);
  
    sendResponse<IInstallment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Installment deleted successfully !',
      data: result,
    });
  });
export const InstallmentController = {
  createInstallment,
  getAllFromDB,
  getByUser,
  updateIntoDB,
  deleteFromDB,
  getById,
  getAllFromDBByStatusPending
};
