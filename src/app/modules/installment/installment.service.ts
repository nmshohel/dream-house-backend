
import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { InstallmentSearchableFields } from "./installment.constrant";
import { IInstallment, IInstallmentFilters } from "./installment.interface";
import { Installment } from "./installment.model";


const createInstallment = async (data: IInstallment) => {
  try {
    const lastInstallment = await Installment.findOne({}).sort({ createdAt: -1 });
    let amount = 5000;

    let nextMonth;
    let nextYear;

    if (lastInstallment) {
      // Convert the month to a number
      const lastMonth: number = parseInt(lastInstallment.month, 10);
      const lastYear = parseInt(lastInstallment.year);

      // Increment the month, and handle the case where it goes beyond 12
      nextMonth = (lastMonth % 12) + 1;
      nextYear = lastMonth === 12 ? lastYear + 1 : lastYear;
    } else {
      // If there's no previous installment, set default values
      nextMonth = 1;
      nextYear = new Date().getFullYear();
    }

    let i: number;
    for (i = 0; i <= amount; i++) {
      // in loop for create installment 

      const createdInstallment = await Installment.create({
        month: nextMonth,
        year: nextYear,
        email: data.email,
        amount: 3000,
      });

      if (!createdInstallment) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create Installment!");
      }

      // Update nextMonth for the next iteration
      nextMonth = (nextMonth % 12) + 1;

      amount -= 3000;
    }
    
    return { message: "amount created" };
  } catch (error) {
    // Handle the error appropriately (e.g., log it, throw a custom error, etc.)
    console.error("Error creating installment:", error);
    throw error; // Re-throw the error for the calling code to handle
  }
};



const getAllFromDB = async (
    filters: IInstallmentFilters,
    paginationOptions: IPaginationOptions
  ): Promise<IGenericResponse<IInstallment[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);
  
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
      andConditions.push({
        $or: InstallmentSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
  
    const result = await Installment.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
  
    const total = await Installment.countDocuments(whereConditions);
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };

const getById = async (id: string): Promise<IInstallment | null> => {
    const result = await Installment.findOne({ id })
    return result;
  };
const updateIntoDB = async (
    id: string,
    payload: Partial<IInstallment>
  ): Promise<IInstallment | null> => {
    const isExist = await Installment.findOne({ id });
  
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Installment not found !');
    }
  
    const result = await Installment.findOneAndUpdate({ id }, payload, {
      new: true,
    });
    return result;
  };

const deleteFromDB = async (id: string): Promise<IInstallment | null> => {
    // Find the user by ID
    const installmentToDelete = await Installment.findOne({ id });
  
    // Check if the user exists
    if (!installmentToDelete) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Installment not found!');
    }
  
    // Store user details before deletion
    const deletedUser = { ...installmentToDelete.toObject() };
  
    // Delete the user
    const deleteResult = await Installment.deleteOne({ id });
  
    // Check if the deletion was successful
    if (deleteResult.deletedCount === 0) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete installment!');
    }
  
    // Return the deleted user details
    return deletedUser;
  };
  


export const InstallmentService={
  createInstallment,
    getAllFromDB,
    getById,
    updateIntoDB,
    deleteFromDB
}