import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PenantyFilterableFields } from './penanty.constrant';
import { IPenanty } from './penanty.interface';
import { PenantyService } from './penanty.service';
const createPenanty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await PenantyService.createPenanty(userData);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Penanty created successfully!',
      data: result,
    });
  }
);

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, PenantyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
  
    const result = await PenantyService.getAllFromDB(
      filters,
      paginationOptions
    );
  
    sendResponse<IPenanty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Penanty fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  });



  const getById= catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

  
    const result = await PenantyService.getById(id);
  
    sendResponse<IPenanty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Penanty fetched successfully !',
      data: result,
    });
  });
  const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    const result = await PenantyService.updateIntoDB(id, updatedData);
  
    sendResponse<IPenanty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Penanty updated successfully !',
      data: result,
    });
  });


  const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const result = await PenantyService.deleteFromDB(id);
  
    sendResponse<IPenanty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Penanty deleted successfully !',
      data: result,
    });
  });
export const PenantyController = {
 createPenanty,
  getAllFromDB,
  updateIntoDB,
  deleteFromDB,
  getById,
};
