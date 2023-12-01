
import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ExpenseSearchableFields } from "./expense.constrant";
import { ExpenseFilters, IExpense } from "./expense.interface";
import { Expense } from "./expense.model";



const createExpense=async(data:IExpense):Promise<IExpense|null>=>{

    const createdPenanty=await Expense.create(data)
    if(!createdPenanty)
    {
        throw new ApiError(httpStatus.BAD_REQUEST, "Expense to create user!")
    }
    return createdPenanty
}


const getAllFromDB = async (
  filters: ExpenseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IExpense[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: ExpenseSearchableFields.map(field => ({
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

  const result = await Expense.find(whereConditions)
    .sort({
      penantyDate: 1
    })
    .skip(skip)
    .limit(limit);

  const total = await Expense.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getById = async (id: string): Promise<IExpense | null> => {
  const result = await Expense.findOne({ id })
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<IExpense>
): Promise<IExpense | null> => {
  const isExist = await Expense.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Penanty not found !');
  }

  const result = await Expense.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<IExpense | null> => {
  // Find the user by ID
  const userToDelete = await Expense.findOne({ id });

  // Check if the user exists
  if (!userToDelete) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Penanty not found!');
  }

  // Store user details before deletion
  const deletedUser = { ...userToDelete.toObject() };

  // Delete the user
  const deleteResult = await Expense.deleteOne({ id });

  // Check if the deletion was successful
  if (deleteResult.deletedCount === 0) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete Expense!');
  }

  // Return the deleted user details
  return deletedUser;
};



export const ExpenseService={
  createExpense,
  getAllFromDB,
  getById,
  updateIntoDB,
  deleteFromDB
}