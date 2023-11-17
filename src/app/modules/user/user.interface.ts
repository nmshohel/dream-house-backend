/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';


export type IUser = {
  id: string;
  role: string;
  password: string;
  name:string;
  email:string
};

export type UserModel = {
} & Model<IUser>;

// export type IStudent = {
//     id: string;
//     name: UserName; //embedded object
//     gender: 'male' | 'female';
//     dateOfBirth: string;
//     email: string;
//     contactNo: string;
//     emergencyContactNo: string;
//     bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
//     presentAddress: string;
//     permanentAddress: string;
//     guardian: Guardian; // embedded object
//     localGuardian: LocalGuardian; // embedded object
//     academicFaculty: Types.ObjectId | IAcademicFaculty; // reference _id
//     academicDepartment: Types.ObjectId | IAcademicDepartment; // reference _id
//     academicSemester: Types.ObjectId | IAcademicSemester; // reference _id
//     profileImage?: string;
//   };