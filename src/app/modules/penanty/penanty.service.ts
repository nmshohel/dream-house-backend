
import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { PenantySearchableFields } from "./penanty.constrant";
import { IPenanty, PenantyFilters } from "./penanty.interface";
import { Penanty } from "./penanty.model";



const createPenanty=async(data:IPenanty):Promise<IPenanty|null>=>{

    const createdPenanty=await Penanty.create(data)
    if(!createdPenanty)
    {
        throw new ApiError(httpStatus.BAD_REQUEST, "Penanty to create user!")
    }
    return createdPenanty
}


const getAllFromDB = async (
  filters: PenantyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPenanty[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: PenantySearchableFields.map(field => ({
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

  const result = await Penanty.find(whereConditions)
    .sort({
      penantyDate: 1
    })
    .skip(skip)
    .limit(limit);

  const total = await Penanty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getById = async (id: string): Promise<IPenanty | null> => {
  const result = await Penanty.findOne({ id })
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<IPenanty>
): Promise<IPenanty | null> => {
  const isExist = await Penanty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Penanty not found !');
  }

  const result = await Penanty.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<IPenanty | null> => {
  // Find the user by ID
  const userToDelete = await Penanty.findOne({ id });

  // Check if the user exists
  if (!userToDelete) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Penanty not found!');
  }

  // Store user details before deletion
  const deletedUser = { ...userToDelete.toObject() };

  // Delete the user
  const deleteResult = await Penanty.deleteOne({ id });

  // Check if the deletion was successful
  if (deleteResult.deletedCount === 0) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete Penanty!');
  }

  // Return the deleted user details
  return deletedUser;
};



export const PenantyService={
  createPenanty,
  getAllFromDB,
  getById,
  updateIntoDB,
  deleteFromDB
}