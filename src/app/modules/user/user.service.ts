
import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { UserSearchableFields } from "./user.constrant";
import { IUser, IUserFilters } from "./user.interface";
import { User } from "./user.model";

const createUser=async(user:IUser):Promise<IUser|null>=>{

  const isUserExist=await User.findOne({userName:user.userName})
  if(isUserExist)
  {
    throw new ApiError(httpStatus.NOT_FOUND, "User already Exists")
  }
    const createdUser=await User.create(user)
    if(!createdUser)
    {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user!")
    }
    return createdUser
}
const getAllFromDB = async (
    filters: IUserFilters,
    paginationOptions: IPaginationOptions
  ): Promise<IGenericResponse<IUser[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);
  
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
      andConditions.push({
        $or: UserSearchableFields.map(field => ({
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
  
    const result = await User.find(whereConditions)
      .sort({
        userName: 1
      })
      .skip(skip)
      .limit(limit);
  
    const total = await User.countDocuments(whereConditions);
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };

const getById = async (id: string): Promise<IUser | null> => {
    const result = await User.findOne({ id })
    return result;
  };
const updateIntoDB = async (
    id: string,
    payload: Partial<IUser>
  ): Promise<IUser | null> => {
    const isExist = await User.findOne({ id });
  
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
    }
  
    const result = await User.findOneAndUpdate({ id }, payload, {
      new: true,
    });
    return result;
  };

const deleteFromDB = async (id: string): Promise<IUser | null> => {
    // Find the user by ID
    const userToDelete = await User.findOne({ id });
  
    // Check if the user exists
    if (!userToDelete) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }
  
    // Store user details before deletion
    const deletedUser = { ...userToDelete.toObject() };
  
    // Delete the user
    const deleteResult = await User.deleteOne({ id });
  
    // Check if the deletion was successful
    if (deleteResult.deletedCount === 0) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete user!');
    }
  
    // Return the deleted user details
    return deletedUser;
  };
  


export const UserService={
    createUser,
    getAllFromDB,
    getById,
    updateIntoDB,
    deleteFromDB
}