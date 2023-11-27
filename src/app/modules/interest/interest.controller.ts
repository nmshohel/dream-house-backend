import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { InterestFilterableFields } from './interest.constrant';
import { IInterest } from './interest.interface';
import { InterestService } from './interest.service';



const createInstallment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await InterestService.createInterest(userData);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Interest created successfully!',
      data: result,
    });
  }
);

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, InterestFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
  
    const result = await InterestService.getAllFromDB(
      filters,
      paginationOptions
    );
  
    sendResponse<IInterest[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Interest fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  });



  const getById= catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

  
    const result = await InterestService.getById(id);
  
    sendResponse<IInterest>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Interest fetched successfully !',
      data: result,
    });
  });
  const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    const result = await InterestService.updateIntoDB(id, updatedData);
  
    sendResponse<IInterest>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Interest updated successfully !',
      data: result,
    });
  });


  const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const result = await InterestService.deleteFromDB(id);
  
    sendResponse<IInterest>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Interest deleted successfully !',
      data: result,
    });
  });
export const InterestController = {
  createInstallment,
  getAllFromDB,
  
  updateIntoDB,
  deleteFromDB,
  getById,
};
