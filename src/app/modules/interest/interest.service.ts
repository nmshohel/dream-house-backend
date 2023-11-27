
import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { InterestSearchableFields } from "./interest.constrant";
import { IInterest, IInterestFilters } from "./interest.interface";
import { Interest } from "./interest.model";


const createInterest=async(data:IInterest):Promise<IInterest|null>=>{

    const createdInterest=await Interest.create(data)
    if(!createdInterest)
    {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user!")
    }
    return createdInterest
}


const getAllFromDB = async (
  filters: IInterestFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IInterest[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: InterestSearchableFields.map(field => ({
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

  const result = await Interest.find(whereConditions)
    .sort({
      userName: 1
    })
    .skip(skip)
    .limit(limit);

  const total = await Interest.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getById = async (id: string): Promise<IInterest | null> => {
  const result = await Interest.findOne({ id })
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<IInterest>
): Promise<IInterest | null> => {
  const isExist = await Interest.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Interst not found !');
  }

  const result = await Interest.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<IInterest | null> => {
  // Find the user by ID
  const userToDelete = await Interest.findOne({ id });

  // Check if the user exists
  if (!userToDelete) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Interest not found!');
  }

  // Store user details before deletion
  const deletedUser = { ...userToDelete.toObject() };

  // Delete the user
  const deleteResult = await Interest.deleteOne({ id });

  // Check if the deletion was successful
  if (deleteResult.deletedCount === 0) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete Interst!');
  }

  // Return the deleted user details
  return deletedUser;
};



export const InterestService={
  createInterest,
  getAllFromDB,
  getById,
  updateIntoDB,
  deleteFromDB
}