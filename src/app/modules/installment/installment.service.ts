
import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { User } from "../user/user.model";
import { InstallmentSearchableFields } from "./installment.constrant";
import { IInstallment, IInstallmentFilters } from "./installment.interface";
import { Installment } from "./installment.model";

const createInstallment = async (data: IInstallment): Promise<any> => {
  
  const isUserExist=await User.findOne({userName:data.userName})
if(!isUserExist)
{
  throw new ApiError(httpStatus.NOT_FOUND, "User Not Found")
}
  let createdAmount=0;
  try {
    const lastInstallment = await Installment.findOne({userName:data?.userName}).sort({ createdAt: -1 });
    let amount:number = parseInt(data?.amount);
   
    let nextMonth;
    let nextYear;

    if (lastInstallment) {
      // Convert the month to a number
      const lastMonth: number = parseInt(lastInstallment.month, 10);
      const lastYear: number = parseInt(lastInstallment.year, 10);

      // Increment the month and handle the case where it goes beyond 12
      nextMonth = (lastMonth % 12) + 1;
      nextYear = lastMonth === 12 ? lastYear + 1 : lastYear;

      // Check if the last installment amount is less than 3000
      if (Number(lastInstallment.amount) < 3000) {
        // Fill up the remaining amount for the last month
        const remainingForLastMonth = 3000 - Number(lastInstallment.amount);
        await Installment.updateOne(
          { _id: lastInstallment._id },
          { $set: { amount: 3000 } }
        );

        amount -= remainingForLastMonth;
        createdAmount=createdAmount+remainingForLastMonth
      }
    } else {
      // If there's no previous installment, set default values
      nextMonth = 1;
      nextYear = new Date().getFullYear();
    }

    while (amount > 0) {
      const createdInstallment = await Installment.create({
        month: nextMonth,
        year: nextYear,
        userName: data.userName,
        installmentType:data.installmentType,
        amount: Math.min(amount, 3000), // Ensure the installment amount is at most 3000
      });

      if (!createdInstallment) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create Installment!");
      }
      // counter valriable
      createdAmount=createdAmount+parseInt(createdInstallment.amount)
      amount -= 3000;

      // Update nextMonth and nextYear for the next iteration
      nextMonth += 1;
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
      }
    }

  } catch (error) {
    // Handle the error appropriately (e.g., log it, throw a custom error, etc.)
    console.error("Error creating installment:", error);
    throw error; // Re-throw the error for the calling code to handle
  }

  return {
    "message":`Amount ${createdAmount} added for ${data.userName}`
  };
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
    const sortConditions: { [key: string]: SortOrder } = {createdAt: -1,};
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
const getByUser = async (
    filters: IInstallmentFilters,
    paginationOptions: IPaginationOptions,
    userName:string
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
    const sortConditions: { [key: string]: SortOrder } = {createdAt: -1,};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
  
    const result = await Installment.find({
      ...whereConditions,
      userName:userName
    })
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
    const result = await Installment.findById(id);
    return result;
  };
const updateIntoDB = async (
    id: string,
    payload: Partial<IInstallment>
  ): Promise<IInstallment | null> => {
    const isExist = await Installment.findById(id);
  
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Installment not found !');
    }
  
    const result = await Installment.findOneAndUpdate({ _id:id }, payload, {
      new: true,
    });
    return result;
  };

const deleteFromDB = async (id: string): Promise<IInstallment | null> => {
    // Find the user by ID
    const isExist = await Installment.findById(id);
  
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Installment not found !');
    }
  
    // Store user details before deletion
    const deleteInstallment = { ...isExist.toObject() };
  
    // Delete the user
    const deleteinstallment = await Installment.deleteOne({ _id:id });
  
    // Check if the deletion was successful
    if (deleteinstallment.deletedCount === 0) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete installment!');
    }
  
    // Return the deleted user details
    return deleteInstallment;
  };
  


export const InstallmentService={
  createInstallment,
    getAllFromDB,
    getByUser,
    updateIntoDB,
    deleteFromDB,
    getById
}